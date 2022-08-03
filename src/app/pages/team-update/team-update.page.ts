import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team';
import { InteractionService } from 'src/app/services/interaction.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-team-update',
  templateUrl: './team-update.page.html',
  styleUrls: ['./team-update.page.scss'],
})
export class TeamUpdatePage implements OnInit {
  teamData: Team;
  team: Team;
  file: any;
  imgState: boolean = false;

  constructor(
    private router: Router,
    private firestoreService: FirestoreService,
    private interaction: InteractionService,
    private angularStorage: AngularFireStorage,
    private nav: NavController
  ) { }

  ngOnInit() {
    this.getTeamData();
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

  async updateImgLogoTeam(){
    await this.interaction.showLoading('Actualizando imagen...');
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

  async updateTeam(name, description, country, campus, birthday){
    await this.interaction.showLoading('Actualizando...');
    const datosTeam: Team = {
      name: name.value,
      description: description.value,
      country: country.value,
      campus: campus.value,
      birthday: birthday.value
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

  uploadImg($event: any) {
    this.file = $event.target.files[0];
    //console.log(this.file);
  }

  onSelectImgUpdate(){
    this.imgState = true;
  }
}
