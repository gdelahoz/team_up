import { TeamService } from './../../services/team.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, PopoverController } from '@ionic/angular';
import { PopoverMenuComponent } from 'src/app/components/popovers/popover-menu/popover-menu.component';
import { Team } from 'src/app/models/team';
import { UserI } from 'src/app/models/user';

@Component({
  selector: 'app-team',
  templateUrl: 'team.page.html',
  styleUrls: ['team.page.scss']
})
export class teamPage implements OnInit{
  userData: UserI;
  teamData: Team;
  default = "players";
  coachList = [];
  assistCoachList = [];
  playerList = [];

  @ViewChild(IonSegment) segment: IonSegment;

  constructor( 
    private popoverCtrl: PopoverController,
    private teamService: TeamService
  ) {}

  ngOnInit(){
    //this.segment.value = "players";
    this.getUserData();
    this.getTeamData();
    this.getCoachTeam();
    this.getAssistCoachTeam();
    this.getPlayerTeam();
  }

  async ionViewWillEnter(){
    //this.segment.value = "players";
    await this.getUserData();
    await this.getTeamData();
    await this.getCoachTeam();
    await this.getAssistCoachTeam();
    await this.getPlayerTeam();
  }

  segmentChanged( event ){
    this.default = event.detail.value;
    /*const valorSegment = event.detail.value;
    console.log(valorSegment);*/
  }

  getUserData(){
    this.userData = JSON.parse(localStorage.getItem('infoUser')) as UserI;
  }

  getTeamData(){
    this.teamData = JSON.parse(localStorage.getItem('infoTeam')) as Team;
  }

  async getCoachTeam(){
    if (this.userData) {
      this.coachList = await this.teamService.getUserTeam(this.userData.teamId, "Entrenador");
    }
  }

  async getAssistCoachTeam(){
    if (this.userData) {
      this.assistCoachList = await this.teamService.getUserTeam(this.userData.teamId, "Asistente de entrenador");
    }
  }

  async getPlayerTeam(){
    if (this.userData) {
      this.playerList = await this.teamService.getPlayerTeam(this.userData.teamId, "Jugador", "Extremo derecho");
      console.log('EXTREMOS: ' + this.playerList);
    }
  }

  deletePlayerModal(){}

  editPlayer(){}

}
