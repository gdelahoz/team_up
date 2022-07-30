import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team';
import { UserI } from 'src/app/models/user';
import { Event } from './../../models/event';
import { InteractionService } from 'src/app/services/interaction.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss']
})
export class calendarPage implements OnInit{
  userData: UserI;
  teamData: Team;
  eventData: Event;
  eventsList = [];

  constructor(
    private router: Router,
    private intService: InteractionService, 
    private eventService: EventService
  ) {}

  ngOnInit(){
    this.getUserData();
    this.getTeamData();
    this.getEventData();
    /*if (this.userData.rol == 'Jugador') {
      this.getPlayerData();
    }*/
  }

  async ionViewWillEnter() {
    await this.getUserData();
    await this.getTeamData();
    await this.getEventData();
  }

  getUserData(){
    this.userData = JSON.parse(localStorage.getItem('infoUser')) as UserI;
  }

  getTeamData(){
    this.teamData = JSON.parse(localStorage.getItem('infoTeam')) as Team;
  }

  async getEventData(){
    this.eventsList = await this.eventService.getEventData(this.teamData.id);
    //console.log(this.announcementsList);
  }

  openCreateEvent(){
    this.router.navigate(['tabs/calendar/create-event']);
  }

}
