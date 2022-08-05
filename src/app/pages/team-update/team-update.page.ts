import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team';
import { InteractionService } from 'src/app/services/interaction.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-team-update',
  templateUrl: './team-update.page.html',
  styleUrls: ['./team-update.page.scss'],
})
export class TeamUpdatePage implements OnInit {
  teamData: Team;
  team: Team;
  file: any;
  teamForm: FormGroup;
  logoForm: FormGroup;
  bannerForm: FormGroup;
  isSubmitted = false;
  maxDate = new Date().toISOString().split("T")[0];

  constructor(
    private firestoreService: FirestoreService,
    private interaction: InteractionService,
    private angularStorage: AngularFireStorage,
    private nav: NavController,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getTeamData();
    this.teamForm = this.formBuilder.group({
      name: [this.teamData.name, [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      country: [this.teamData.country, [Validators.required]],
      campus: [this.teamData.campus, [Validators.required]],
      birthday: [this.teamData.birthday, [Validators.required]],
      description: [this.teamData.description, [Validators.maxLength(200)]],
    })
    this.logoForm = this.formBuilder.group({
      imgLogo: ['', [Validators.required]]
    })
    this.bannerForm = this.formBuilder.group({
      imgBanner: ['', [Validators.required]]
    })
  }

  get errorControlTeam() {
    return this.teamForm.controls;
  }

  get errorControlLogo() {
    return this.logoForm.controls;
  }

  get errorControlBanner() {
    return this.bannerForm.controls;
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

  async updateImgBannerTeam(){
    await this.interaction.showLoading('Actualizando imagen...');
    this.isSubmitted = true;
    if (!this.bannerForm.valid) {
      this.interaction.closeLoading();
      return false;
    } else {
      let img;
      await this.enviar().then(res => { img = res })
      console.log('RUTA IMAGEN ->>', img);
      
      this.firestoreService.editTeam(this.teamData.id, {imgBanner: img});
  
      await new Promise((resolve) => {
        this.firestoreService.getTeamData(this.teamData.id).subscribe(async res => {
          this.team = await res;
          //console.log(this.team);
          localStorage.setItem('infoTeam', JSON.stringify(this.team));
          resolve("Promesa resuelta");
        });
      });
      
      this.interaction.closeLoading();
      this.interaction.presentToast('Imagen actualizada.');
      this.nav.navigateBack(['/tabs/home']);
    }
  }

  async updateImgLogoTeam(){
    await this.interaction.showLoading('Actualizando imagen...');
    this.isSubmitted = true;
    if (!this.logoForm.valid) {
      this.interaction.closeLoading();
      return false;
    } else {
      let img;
      await this.enviar().then(res => { img = res })
      console.log('RUTA IMAGEN ->>', img);
      
      this.firestoreService.editTeam(this.teamData.id, {imgLogo: img});
  
      await new Promise((resolve) => {
        this.firestoreService.getTeamData(this.teamData.id).subscribe(async res => {
          this.team = await res;
          //console.log(this.team);
          localStorage.setItem('infoTeam', JSON.stringify(this.team));
          resolve("Promesa resuelta");
        });
      });
      
      this.interaction.closeLoading();
      this.interaction.presentToast('Imagen actualizada.');
      this.nav.navigateBack(['/tabs/home']);
    }
  }

  async updateTeam(){
    await this.interaction.showLoading('Actualizando...');
    this.isSubmitted = true;

    if (!this.teamForm.valid) {
      this.interaction.closeLoading();
      return false;
    } else {
      const datosTeam: Team = {
        name: this.teamForm.value.name,
        description: this.teamForm.value.description,
        country: this.teamForm.value.country,
        campus: this.teamForm.value.campus,
        birthday: this.teamForm.value.birthday
      }
      this.firestoreService.editTeam(this.teamData.id, datosTeam);
  
      await new Promise((resolve) => {
        this.firestoreService.getTeamData(this.teamData.id).subscribe(async res => {
          this.team = await res;
          //console.log(this.team);
          localStorage.setItem('infoTeam', JSON.stringify(this.team));
          resolve("Promesa resuelta");
        });
      });
      
      this.interaction.closeLoading();
      this.interaction.presentToast('Datos de equipo actualizados correctamente.');
      this.nav.navigateBack(['/tabs/home']);
    }
  }

  uploadImg($event: any) {
    this.file = $event.target.files[0];
    //console.log(this.file);
  }
}
