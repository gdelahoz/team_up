import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team';
import { UserI } from 'src/app/models/user';
import { InteractionService } from 'src/app/services/interaction.service';
import { EventService } from 'src/app/services/event.service';
import * as moment from 'moment';
import { PopoverController } from '@ionic/angular';
import { PopoverAssistComponent } from 'src/app/components/popovers/popover-assist/popover-assist.component';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss']
})
export class calendarPage implements OnInit{
  userData: UserI;
  teamData: Team;
  eventsList = [];
  index: any;

  constructor(
    private router: Router,
    private intService: InteractionService, 
    private popoverCtrl: PopoverController,
    private eventService: EventService
  ) {}

  ngOnInit(){
    this.getUserData();
    this.getTeamData();
    /*if (this.userData.rol == 'Jugador') {
      this.getPlayerData();
    }*/
  }

  async ionViewWillEnter() {
    await this.getUserData();
    await this.getTeamData();
    await this.getEvents();
  }

  getUserData(){
    this.userData = JSON.parse(localStorage.getItem('infoUser')) as UserI;
  }

  getTeamData(){
    this.teamData = JSON.parse(localStorage.getItem('infoTeam')) as Team;
  }

  async getEvents(){
    this.eventsList = await this.eventService.getEvents(this.teamData.id);
    //console.log(this.eventsList);
  }

  openCreateEvent(){
    this.router.navigate(['tabs/calendar/create-event']);
  }

  dateFormat(date){
    return moment(date).format('ll');
  }

  timeFormat(data){
    return moment(data, "hh:mm").format('h:mm a')
  }

  onDateChange(){}

  async openPopoverAssist( evento, userId, eventId, index){
    console.log('ABRIR POPOVER');

    const popover = await this.popoverCtrl.create({
      component: PopoverAssistComponent,
      event: evento, 
      componentProps: {userId: userId, eventId: eventId, index: index}
    });

    popover.onDidDismiss().then(async (dataReturned) => {
      if (dataReturned !== null) {
        
        this.index = dataReturned.data;

        if (this.index) {
          await this.getEvents();
          this.intService.presentToast('Se ha añadido tu asistencia.');
        }
        // console.log(this.dataReturned); imprime el dato recibido del componente
      }
    });

    await popover.present();

  }
}
