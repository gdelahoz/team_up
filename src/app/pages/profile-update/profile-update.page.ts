import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FirestoreService } from './../../services/firestore.service';
import { NavController } from '@ionic/angular';
import { InteractionService } from './../../services/interaction.service';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Player } from 'src/app/models/player';
import { UserI } from 'src/app/models/user';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.page.html',
  styleUrls: ['./profile-update.page.scss'],
})
export class ProfileUpdatePage implements OnInit {
  userData: UserI;
  user: UserI;
  playerData: Player;
  player: Player;
  file: any;
  imgState: boolean = false;

  constructor(
    private nav: NavController,
    private interaction: InteractionService,
    private firestoreService: FirestoreService,
    private angularStorage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.getUserData();
    if (this.userData.rol == 'Jugador') {
      this.getPlayerData();
    }
  }

  getUserData(){
    this.userData = JSON.parse(localStorage.getItem('infoUser')) as UserI;
  }

  getPlayerData(){
    this.playerData = JSON.parse(localStorage.getItem('infoPlayer')) as Player;
  }

  async updateUser(name, lastname, tel, birthday){
    await this.interaction.showLoading('Actualizando...');
    const datosUser: UserI = {
      name: name.value,
      lastName: lastname.value,
      tel: tel.value,
      birthday: birthday.value,
      email: this.userData.email,
      rol: this.userData.rol
    }
    this.firestoreService.editUser(this.userData.uid, datosUser);

    await new Promise((resolve) => {
      this.firestoreService.getUserData(this.userData.uid).subscribe(async res => {
        this.user = await res;
        //console.log(this.team);
        localStorage.setItem('infoUser', JSON.stringify(this.user));
        resolve("Promesa resuelta");
      });
    });
    
    this.interaction.closeLoading();
    this.interaction.presentToast('Datos actualizados.');
    this.nav.navigateBack(['tabs/home/profile']);
  }

  updatePlayer(){
    
  }

  updatePassword(){
    
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

  async updateImgUser(){
    await this.interaction.showLoading('Actualizando imagen...');
    let img;
    await this.enviar().then(res => { img = res })
    console.log('RUTA IMAGEN ->>', img);
    
    this.firestoreService.editUser(this.userData.uid, {imgProfile: img});

    await new Promise((resolve) => {
      this.firestoreService.getUserData(this.userData.uid).subscribe(async res => {
        this.user = await res;
        //console.log(this.team);
        localStorage.setItem('infoUser', JSON.stringify(this.user));
        resolve("Promesa resuelta");
      });
    });
    
    this.interaction.closeLoading();
    this.interaction.presentToast('Imagen actualizada.');
    this.nav.navigateBack(['/tabs/home/profile']);
  }

  uploadImg($event: any) {
    this.file = $event.target.files[0];
    //console.log(this.file);
  }

  onSelectImgUpdate(){
    this.imgState = true;
  }
}
