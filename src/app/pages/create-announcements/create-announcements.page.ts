import { UserI } from './../../models/user';
import { FirestoreService } from './../../services/firestore.service';
import { Announcement } from './../../models/announcement';
import { AnnouncementService } from './../../services/announcement.service';
import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/services/interaction.service';
import { Team } from 'src/app/models/team';
import { NavController } from '@ionic/angular';
import { Timestamp } from 'firebase/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-announcements',
  templateUrl: './create-announcements.page.html',
  styleUrls: ['./create-announcements.page.scss'],
})
export class CreateAnnouncementsPage implements OnInit {
  userData: UserI;
  teamData: Team;
  team: Team;
  annForm: FormGroup;
  isSubmitted = false;

  constructor(
    private interaction: InteractionService,
    private annService: AnnouncementService,
    private nav: NavController,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.annForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      description: ['', [Validators.required, Validators.maxLength(250)]]
    })
    this.getUserData();
    this.getTeamData();
  }

  algo(){
    console.log(this.annForm);
  }

  get errorControl() {
    return this.annForm.controls;
  }

  getUserData(){
    this.userData = JSON.parse(localStorage.getItem('infoUser')) as UserI;
  }

  getTeamData(){
    this.teamData = JSON.parse(localStorage.getItem('infoTeam')) as Team;
  }

  /* Generar id con caracteres aleatorios generateRandomString(num) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }*/

  async createAnnouncement(){
    await this.interaction.showLoading('Publicando...');
    this.isSubmitted = true;
    if (!this.annForm.valid) {
      this.interaction.closeLoading();
      return false;
    } else {
      const datos: Announcement = {
        teamId: this.teamData.id,
        coachId: this.userData.uid,
  
        title: this.annForm.value.title,
        description: this.annForm.value.description,
        autor: this.userData.name + ' ' + this.userData.lastName,
  
        createdAt: Timestamp.now()
      }
  
      this.annService.createAnnouncements(datos).catch(error => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Ocurrió un error al guardar anuncio.');
        console.log('Error anuncio ->', error);
      })
  
      await new Promise((resolve) => {
        this.annService.getAnnouncementData(this.teamData.id);
        resolve("Promesa resuelta");
      });
      
      this.interaction.closeLoading();
      this.interaction.presentToast('Anuncio creado correctamente.');
      this.nav.navigateBack(['/tabs/home']);
    }
    
  }

  /*async updateAnnouncement(title, description){
    await this.interaction.showLoading('Actualizando...');

    this.annServices.updateAnnouncement(this.teamData.id, title.value);

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
  }*/

}
