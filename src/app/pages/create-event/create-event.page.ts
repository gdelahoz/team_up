import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NavController } from '@ionic/angular';
import { Timestamp } from 'firebase/firestore';
import { finalize } from 'rxjs/operators';
import { Team } from 'src/app/models/team';
import { UserI } from 'src/app/models/user';
import { EventService } from 'src/app/services/event.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { Event } from './../../models/event';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  userData: UserI;
  teamData: Team;
  team: Team;
  file: any;
  imgState: boolean = false;
  eventForm: FormGroup;
  isSubmitted = false;
  minDate = new Date().toISOString().split("T")[0];

  constructor(
    private nav: NavController,
    private interaction: InteractionService, 
    private angularStorage: AngularFireStorage,
    private eventService: EventService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getUserData();
    this.getTeamData();
    this.eventForm = this.formBuilder.group({
      type: ['', Validators.required],
      place: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      imgPlace: [''],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      date: ['', [Validators.required]],
      info: ['', [Validators.required, Validators.maxLength(200)]]
    })
  }

  get errorControl() {
    return this.eventForm.controls;
  }

  getUserData(){
    this.userData = JSON.parse(localStorage.getItem('infoUser')) as UserI;
  }

  getTeamData(){
    this.teamData = JSON.parse(localStorage.getItem('infoTeam')) as Team;
  }

  async enviar() {
    const imgRef = `images/${this.file.name}`;
    const ref = this.angularStorage.ref(imgRef);
    const task = ref.put(this.file);
    const ulr = await new Promise((resolve, reject) => {
      task
        .snapshotChanges()
        .pipe(
          finalize(() =>
            ref.getDownloadURL().subscribe(
              (response) => {
                if (response) {
                  // console.log('url_image', response);
                  resolve(response);
                  return;
                }
              },
              (error) => {
                if (error != null) {
                  reject(error);
                }
              }
            )
          )
        )
        .subscribe();
    });

    //console.log('url_image', ulr);
    return ulr;
  }

  async createEvent(type, date, place, info, startTime, endTime){
    await this.interaction.showLoading('Publicando...');
    this.isSubmitted = true;
    if (!this.eventForm.valid) {
      this.interaction.closeLoading();
      return false;
    } else {
      let img;
      if (this.file == null) {
        img = '';
      } else {
        await this.enviar().then(res => { img = res });
      }
      
      const datos: Event = {
        teamId: this.teamData.id,
  
        type: type.value,
        date: date.value,
        imgPlace: img,
        place: place.value,
        info: info.value,
        startTime: startTime.value,
        endTime: endTime.value,
        attendance: [],
        absence: [],
  
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      }
  
      this.eventService.createEvents(datos).catch(error => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Ocurrió un error al crear la actividad.');
        console.log('Error anuncio ->', error);
      })
  
      await new Promise((resolve) => {
        this.eventService.getEvents(this.teamData.id);
        resolve("Promesa resuelta");
      });
      
      this.interaction.closeLoading();
      this.interaction.presentToast('Actividad creada correctamente.');
      this.nav.navigateBack(['/tabs/calendar']);
    }
  }

  uploadImg($event: any) {
    this.file = $event.target.files[0];
    //console.log(this.file);
  }

  onSelectImgUpdate(){
    this.imgState = true;
  }

}
