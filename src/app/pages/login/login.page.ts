import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario = {
    email: "Usuario",
    password: "Contraseña"
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login(form){
    this.router.navigate(['/tabs/home']);
  }

}
