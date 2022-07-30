import { InteractionService } from './../../services/interaction.service';
import { AnnouncementService } from './../../services/announcement.service';
import { Announcement } from './../../models/announcement';
import { Player } from './../../models/player';
import { Router } from '@angular/router';
import { Team } from './../../models/team';
import { UserI } from './../../models/user';
import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverAnnouncementComponent } from 'src/app/components/popovers/popover-announcement/popover-announcement.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class homePage implements OnInit{
  userData: UserI;
  teamData: Team;
  annData: Announcement;
  playerData: Player;
  announcementsList = [];
  id: string;
  dataReturned: any;

  constructor(
    private router: Router,
    private annService: AnnouncementService,
    private popoverCtrl: PopoverController,
    private intService: InteractionService 
  ) {}

  ngOnInit(){
    this.getUserData();
    this.getTeamData();
    this.getAnnouncementData();
    /*if (this.userData.rol == 'Jugador') {
      this.getPlayerData();
    }*/
  }

  async ionViewWillEnter() {
    await this.getTeamData();
    await this.getAnnouncementData();
  }

  receiveMessage($event) {
    console.log($event);
    //this.announcementsList.splice(annIndex, 1);
    
  }

  getUserData(){
    this.userData = JSON.parse(localStorage.getItem('infoUser')) as UserI;
  }

  getTeamData(){
    this.teamData = JSON.parse(localStorage.getItem('infoTeam')) as Team;
  }

  async getAnnouncementData(){
    this.announcementsList = await this.annService.getAnnouncementData(this.teamData.id);
    //console.log(this.announcementsList);
  }

  /*getPlayerData(){
    this.playerData = JSON.parse(localStorage.getItem('infoPlayer')) as Player;
  }*/

  goToCreateAnn(){
    this.router.navigate(['tabs/home/create-announcements']);
  }

  async openPopoverAnn( evento , id, index ){
    const popover = await this.popoverCtrl.create({
      component: PopoverAnnouncementComponent,
      event: evento,
      componentProps: {id: id, index: index}
    });

    popover.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        this.announcementsList.splice(this.dataReturned, 1);
        this.intService.presentToast('Anuncio eliminado.');
        // console.log(this.dataReturned); imprime el dato recibido del componente
        // alert('Modal Sent Data :'+ dataReturned);
      }
    });
    
    await popover.present();
  }
}
