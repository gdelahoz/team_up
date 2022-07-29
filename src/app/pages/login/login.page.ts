import { Player } from './../../models/player';
import { Team } from './../../models/team';
import { FirestoreService } from './../../services/firestore.service';
import { InteractionService } from './../../services/interaction.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserI } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: UserI;
  team: Team;
  player: Player;

  usuario = {
    email: null,
    password: null
  }

  constructor(
    private router: Router,
    private auth: AuthService,
    private interaction: InteractionService,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit() {
  }

  //Función asincrona de login, recibe la promesa de firbase implementada en el servicio de Auth
  async login(form){
    await this.interaction.showLoading('Ingresando...');
    const res = await this.auth.login(this.usuario.email, this.usuario.password).catch(error => {
      this.interaction.closeLoading();
      this.interaction.presentToast('Usuario o contraseña invalido.');
    });

    if (res) {
      console.log('res -> ', res);

      await new Promise((resolve) => {
        this.firestoreService.getUserData(res.user.uid).subscribe(async res => {
          this.user = await res;
          console.log(this.user);
          localStorage.setItem('infoUser', JSON.stringify(this.user));
          resolve("Promise result");
        });
      });

      console.log(this.user.teamId);
      
      await new Promise((resolve) => {
        this.firestoreService.getTeamData(this.user.teamId).subscribe(async res => {
          this.team = await res;
          console.log(this.team);
          localStorage.setItem('infoTeam', JSON.stringify(this.team));
          resolve("Promise result");
        });
      })
      
      if (this.user.rol == 'Jugador') {
        await new Promise((resolve) => {
          this.firestoreService.getPlayerData(this.user.uid).subscribe(async res => {
            this.player = await res;
            console.log(this.player);
            localStorage.setItem('infoPlayer', JSON.stringify(this.player));
            resolve("Promise result");
          });
        })
      }

      this.interaction.closeLoading();
      this.interaction.presentToast('Usuario ingresado con exito.');
      this.router.navigate(['/tabs/home']);
    }
  }

  /*loginUser(form){
    let userCreate = this.user.create('usuarios', this.usuario);
    userCreate.then(res=>{
      console.log(res);
    })
  }*/

}
