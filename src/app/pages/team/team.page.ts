import { InteractionService } from './../../services/interaction.service';
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
  // Entrenadores
  coachList = [];
  assistCoachList = [];

  // Jugadores
  arqueros = [];
  defensas = [];
  mediocampistas = [];
  delanteros = [];

  @ViewChild(IonSegment) segment: IonSegment;

  constructor( 
    private teamService: TeamService,
    private interaction: InteractionService
  ) {}

  ngOnInit(){
    //this.segment.value = "players";
    this.getUserData();
    this.getTeamData();
    this.getCoachTeam();
    this.getAssistCoachTeam();
    this.getGoalkeeperTeam();
    this.getBackTeam();
    this.getMidfielderTeam();
    this.getForwardTeam();
  }

  async ionViewWillEnter(){
    //this.segment.value = "players";
    await this.getUserData();
    await this.getTeamData();
    await this.getCoachTeam();
    await this.getAssistCoachTeam();
    await this.getGoalkeeperTeam();
    await this.getBackTeam();
    await this.getMidfielderTeam();
    await this.getForwardTeam();
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

  async getGoalkeeperTeam(){
    let goalkeeperArray = ["Portero"]
    if (this.userData) {
      this.arqueros = await this.teamService.getPlayerTeam(this.userData.teamId, "Jugador", goalkeeperArray);
    }
  }

  async getBackTeam(){
    let backArray = ["Defensor central", "Lateral derecho", "Lateral izquierdo"]
    if (this.userData) {
      this.defensas = await this.teamService.getPlayerTeam(this.userData.teamId, "Jugador", backArray);
    }
  }

  async getMidfielderTeam(){
    let midfielderArray = ["Mediocampista central", "Mediocampista derecho", "Mediocampista izquierdo"]
    if (this.userData) {
      this.mediocampistas = await this.teamService.getPlayerTeam(this.userData.teamId, "Jugador", midfielderArray);
      console.log('mediocampistas ',this.mediocampistas);
      
    }
  }

  async getForwardTeam(){
    let forwardArray = ["Delantero centro", "Extremo derecho", "Extremo izquierdo"]
    if (this.userData) {
      this.delanteros = await this.teamService.getPlayerTeam(this.userData.teamId, "Jugador", forwardArray);
    }
  }

  copyId(){
    // Copia el texto seleccionado
    navigator.clipboard.writeText(this.teamData.id).then(
    function(){
        console.log("yeah!"); // success 
    })
    .catch(
      function() {
        console.log("err"); // error
    });
    this.interaction.presentToast('Se ha copiado el codigo al portapapeles.');
  }

  /*deletePlayerModal(){}

  editPlayer(){}*/

}
