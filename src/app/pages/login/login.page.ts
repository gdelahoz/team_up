import { InteractionService } from './../../services/interaction.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario = {
    email: null,
    password: null
  }

  constructor(
    private router: Router,
    private auth: AuthService,
    private interaction: InteractionService
  ) { }

  ngOnInit() {
  }

  //Función asincrona de login, recibe la promesa de firbase implementada en el servicio de Auth
  async login(form){
    //await this.interaction.showLoading('Ingresando...');
    const res = await this.auth.login(this.usuario.email, this.usuario.password).catch(error => {
      console.log('Error');
      //this.interaction.closeLoading;
      this.interaction.presentToast('Usuario o contraseña invalido.')
    });

    if (res) {
      console.log('res -> ', res);
      //this.interaction.closeLoading;
      this.interaction.presentToast('Usuario ingresado con exito.')
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
