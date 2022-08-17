import { Event } from './../../models/event';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NavController } from '@ionic/angular';
import { Timestamp } from 'firebase/firestore';
import { finalize } from 'rxjs/operators';
import { EventService } from 'src/app/services/event.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.page.html',
  styleUrls: ['./event-update.page.scss'],
})
export class EventUpdatePage implements OnInit {
  eventData: Event;
  file: any;
  imgState: boolean = false;
  id: any;
  eventForm: FormGroup;
  imgPlaceForm: FormGroup;
  isSubmitted = false;
  minDate = new Date().toISOString().split("T")[0];

  constructor(
    private nav: NavController,
    private interaction: InteractionService, 
    private angularStorage: AngularFireStorage,
    private eventService: EventService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    //console.log(this.id);
    
    this.getEventData(this.id);

    this.eventForm = this.formBuilder.group({
      type: ['', [Validators.required]],
      place: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      date: ['', [Validators.required]],
      info: ['', [Validators.required, Validators.maxLength(200)]]
    })
    
    this.imgPlaceForm = this.formBuilder.group({
      imgPlace: ['', [Validators.required]],
    })
  }

  get errorControl() {
    return this.eventForm.controls;
  }

  get errorControlImg() {
    return this.imgPlaceForm.controls;
  }

  async getEventData(id){
    this.eventData = await new Promise((resolve) => {
      this.eventService.getEventData(id).subscribe(res => {
        resolve(res);
      });
    });
    console.log('EVENT DATA',this.eventData);
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

  async updateEvent(type, date, place, info, startTime, endTime){
    await this.interaction.showLoading('Actualizando...');
    this.isSubmitted = true;
    if (!this.eventForm.valid) {
      this.interaction.closeLoading();
      return false;
    } else {
      const datosEvent: Event = {
        type: type.value,
        date: date.value,
        place: place.value,
        info: info.value,
        startTime: startTime.value,
        endTime: endTime.value,
        updatedAt: Timestamp.now()
      }
      this.eventService.updateEvent(this.id, datosEvent);

      await new Promise((resolve) => {
        this.eventService.getEventData(this.id);
        resolve("Promesa resuelta");
      });
      
      this.interaction.closeLoading();
      this.interaction.presentToast('Actividad actualizada.');
      this.nav.navigateBack(['tabs/calendar/event-detail/' + this.id]);
    }
  }

  async updateImgEvent(){
    await this.interaction.showLoading('Actualizando imagen...');
    let img;
    await this.enviar().then(res => { img = res })
    console.log('RUTA IMAGEN ->>', img);
    
    this.eventService.updateEvent(this.id, {imgPlace: img});

    await new Promise((resolve) => {
      this.eventService.getEventData(this.id);
      resolve("Promesa resuelta");
    });
    
    this.interaction.closeLoading();
    this.interaction.presentToast('Imagen actualizada.');
    this.nav.navigateBack(['tabs/calendar/event-detail/' + this.id]);
  }

  uploadImg($event: any) {
    this.file = $event.target.files[0];
    //console.log(this.file);
  }

  onSelectImgUpdate(){
    this.imgState = true;
  }
}
