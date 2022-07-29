import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player';
import { UserI } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData: UserI;
  playerData: Player;

  constructor() { }

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

  updateProfile(){
    
  }

}
