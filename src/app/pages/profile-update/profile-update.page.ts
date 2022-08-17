import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FirestoreService } from './../../services/firestore.service';
import { NavController } from '@ionic/angular';
import { InteractionService } from './../../services/interaction.service';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Player } from 'src/app/models/player';
import { UserI } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  userForm: FormGroup;
  playerForm: FormGroup;
  imgProfileForm: FormGroup;
  isSubmitted = false;
  maxDate = "2018-12-31";

  constructor(
    private nav: NavController,
    private interaction: InteractionService,
    private firestoreService: FirestoreService,
    private angularStorage: AngularFireStorage,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getUserData();
    if (this.userData.rol == 'Jugador') {
      this.getPlayerData();
      this.playerForm = this.formBuilder.group({
        email: [{value: this.userData.email, disabled: true}, Validators.required],
        name: [this.userData.name, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        lastname: [this.userData.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
        tel: [this.userData.tel, [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(9999999), Validators.max(999999999999)]],
        birthday: [this.userData.birthday, [Validators.required]],
        height: [this.playerData.height, [Validators.required, Validators.min(60), Validators.max(250)]],
        weight: [this.playerData.weight, [Validators.required, Validators.min(30), Validators.max(150)]],
        dorsal: [this.playerData.dorsal, [Validators.min(1), Validators.max(99)]],
        position: [this.playerData.position, [Validators.required]],
        secondPosition: [this.playerData.secondPosition, [Validators.required]]
      })
    }
    this.userForm = this.formBuilder.group({
      email: [{value: this.userData.email, disabled: true}, Validators.required],
      name: [this.userData.name, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      lastname: [this.userData.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      tel: [this.userData.tel, [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(9999999), Validators.max(999999999999)]],
      birthday: [this.userData.birthday, [Validators.required]]
    })
    this.imgProfileForm = this.formBuilder.group({
      imgProfile: ['', [Validators.required]]
    })
  }

  get errorControlUser() {
    return this.userForm.controls;
  }

  get errorControlPlayer() {
    return this.playerForm.controls;
  }

  get errorControlImg() {
    return this.imgProfileForm.controls;
  }

  getUserData(){
    this.userData = JSON.parse(localStorage.getItem('infoUser')) as UserI;
  }

  getPlayerData(){
    this.playerData = JSON.parse(localStorage.getItem('infoPlayer')) as Player;
  }

  async updateUser(name, lastname, tel, birthday){
    await this.interaction.showLoading('Actualizando...');
    this.isSubmitted = true;
    if (!this.userForm.valid) {
      this.interaction.closeLoading();
      return false;
    } else {
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
  }

  async updatePlayer(name, lastname, tel, birthday, height, weight, dorsal, position, secondPosition){
    await this.interaction.showLoading('Actualizando...');
    this.isSubmitted = true;
    if (!this.playerForm.valid) {
      this.interaction.closeLoading();
      return false;
    } else {
      const datosUser: UserI = {
        name: name.value,
        lastName: lastname.value,
        tel: tel.value,
        birthday: birthday.value,
        email: this.userData.email,
        rol: this.userData.rol
      }
      this.firestoreService.editUser(this.userData.uid, datosUser);
  
      const datosPlayer: Player = {
        height: height.value,
        weight: weight.value,
        dorsal: dorsal.value,
        position: position.value,
        secondPosition: secondPosition.value
      }
      this.firestoreService.editPlayer(this.userData.uid, datosPlayer);
  
      await new Promise((resolve) => {
        this.firestoreService.getUserData(this.userData.uid).subscribe(async res => {
          this.user = await res;
          localStorage.setItem('infoUser', JSON.stringify(this.user));
          resolve("Promesa resuelta");
        });
      });
  
      await new Promise((resolve) => {
        this.firestoreService.getPlayerData(this.userData.uid).subscribe(async res => {
          this.player = await res;
          localStorage.setItem('infoPlayer', JSON.stringify(this.player));
          resolve("Promesa resuelta");
        });
      });
      
      this.interaction.closeLoading();
      this.interaction.presentToast('Datos actualizados.');
      this.nav.navigateBack(['tabs/home/profile']);
    }
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
    this.isSubmitted = true;
    if (!this.imgProfileForm.valid) {
      this.interaction.closeLoading();
      return false;
    } else {
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
  }

  uploadImg($event: any) {
    this.file = $event.target.files[0];
    //console.log(this.file);
  }

  onSelectImgUpdate(){
    this.imgState = true;
  }
}
