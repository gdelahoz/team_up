import { Team } from './../../models/team';
import { UserI } from './../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class homePage implements OnInit{
  userData: UserI;
  teamData: Team;

  constructor() {}

  ngOnInit(){
    this.getUserData();
    this.getTeamData();
  }

  async ionViewWillEnter() {
    await this.getTeamData();
    console.log('EQUIPO ->', this.teamData);
    
  }

  getUserData(){
    this.userData = JSON.parse(localStorage.getItem('infoUser')) as UserI;
  }

  getTeamData(){
    this.teamData = JSON.parse(localStorage.getItem('infoTeam')) as Team;
  }
}
