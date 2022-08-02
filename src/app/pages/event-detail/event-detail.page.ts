import { Event } from './../../models/event';
import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';
import { Team } from 'src/app/models/team';
import { UserI } from 'src/app/models/user';
import { EventService } from 'src/app/services/event.service';
import { InteractionService } from 'src/app/services/interaction.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
  userData: UserI;
  teamData: Team;
  eventData: Event;
  eventsList = [];
  attList = [];
  absList = [];
  id: any;

  constructor(
    private intService: InteractionService, 
    private popoverCtrl: PopoverController,
    private eventService: EventService,
    private route: ActivatedRoute,
    private nav: NavController
  ) { }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    //alert(this.id);
    await this.getUserData();
    await this.getTeamData();
    await this.getEventData(this.id);
    await this.getAttendance();
    await this.getAbsence();
  }

  async ionViewWillEnter(){
    await this.getEventData(this.id);
  }

  getUserData(){
    this.userData = JSON.parse(localStorage.getItem('infoUser')) as UserI;
  }

  getTeamData(){
    this.teamData = JSON.parse(localStorage.getItem('infoTeam')) as Team;
  }

  async getEventData(id){
    this.eventData = await new Promise((resolve) => {
      this.eventService.getEventData(id).subscribe(res => {
        resolve(res);
      });
    });
    
  }

  async getAttendance(){
    let attArray = [];
    if (this.eventData) {
      this.eventData.attendance.forEach(att => {
        attArray.push(att['userId']);
      });
      //console.log(attArray);
      
      this.attList = await this.eventService.getAttendance(attArray);
      //console.log('Lista de asistentes: ', this.attList);
    }
  }

  async getAbsence(){
    let absArray = [];
    if (this.eventData) {
      this.eventData.absence.forEach(abs => {
        absArray.push(abs['userId']);
      });
      
      this.absList = await this.eventService.getAbsence(absArray);
      //console.log('Lista de inasistentes: ', this.absList);
    }
  }

  dateFormat(date){
    return moment(date).format('ll');
  }

  timeFormat(data){
    return moment(data, "hh:mm").format('h:mm a')
  }

  goToUpdateEvent(){
    this.nav.navigateForward(['tabs/calendar/event-detail/' + this.id +'/event-update']);
  }

}
