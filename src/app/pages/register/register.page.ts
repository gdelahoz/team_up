import { Team } from './../../models/team';
import { FirestoreService } from './../../services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserI } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coach } from 'src/app/models/coach';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  role: string;
  position: string;
  secondPosition: string;
  typeCoach: string;
  teamCountry: string;

  constructor(
    private router: Router,
    private auth: AuthService,
    private firestore: FirestoreService,
    private interaction: InteractionService
  ) { }

  ngOnInit() {
  }

  //Registro de entrenador
  async registerCoach(name, lastname, email, tel, birthday, password, teamName, campus, teamBirthday){
    await this.interaction.showLoading('Registrando...');
    const result = await this.auth.register(email.value, password.value).catch(error => {
      this.interaction.closeLoading();
      this.interaction.presentToast('Ocurrió un error al crear usuario entrenador');
    })

    if (result) {
      const id = result.user.uid;

      const datosTeam: Team = {
        players: [],
        imgLogo: '',
        description: '',
        name: teamName.value,
        country: this.teamCountry,
        campus: campus.value,
        birthday: teamBirthday.value
      }
      const resultTeam = await this.firestore.createTeam(datosTeam);

      const datosUser: UserI = {
        uid: id,
        teamId: resultTeam.id,
        
        name: name.value,
        lastName: lastname.value,
        email: email.value,
        tel: tel.value,
        imgProfile: '',
        birthday: birthday.value,
        rol: this.role
      }
      this.firestore.createCoach(datosUser, resultTeam.id, this.role);

      const datosCoach: UserI = {
        name: name.value,
        lastName: lastname.value,
        email: email.value,
        tel: tel.value,
        birthday: birthday.value,
        rol: this.role
      }
      this.firestore.editTeam(resultTeam.id, {coaches: [datosCoach]});
      this.interaction.closeLoading();
      this.interaction.presentToast('Usuario registrado correctamente, inicia sesión para continuar.');
      this.router.navigate(['/login']);
    }
  }

  //Registro de asistente
  async registerAssistCoach(name, lastname, email, tel, birthday, password, teamId){
    await this.interaction.showLoading('Registrando...');
    const result = await this.auth.register(email.value, password.value).catch(error => {
      this.interaction.closeLoading();
      this.interaction.presentToast('Ocurrió un error al crear usuario entrenador.');
    })

    if (result) {
      console.log('Usuario asistente registrado correctamente.');
      const id = result.user.uid;

      const datosUser: UserI = {
        uid: id,
        
        name: name.value,
        lastName: lastname.value,
        email: email.value,
        imgProfile: '',
        tel: tel.value,
        birthday: birthday.value,
        rol: this.role
      }
      this.firestore.createCoach(datosUser, teamId.value, this.role);

      this.firestore.addCoachTeam(
        name.value, 
        lastname.value, 
        email.value,
        tel.value, 
        birthday.value,
        this.role, 
        teamId.value
      );
      this.interaction.closeLoading();
      this.interaction.presentToast('Usuario registrado correctamente, inicia sesión para continuar.');
      this.router.navigate(['/login']);
    }
  }

  //Registro de jugador
  async registerPlayer(name, lastname, email, tel, birthday, password, height, weight, position, secondPosition, teamId){
    await this.interaction.showLoading('Registrando...');
    const result = await this.auth.register(email.value, password.value).catch(error => {
      this.interaction.closeLoading();
      this.interaction.presentToast('Ocurrió un error al registrar jugador.');
    })

    if (result) {
      console.log('Usuario jugador registrado correctamente.');
      const id = result.user.uid;

      const datosUser: UserI = {
        uid: id,
        
        name: name.value,
        lastName: lastname.value,
        email: email.value,
        tel: tel.value,
        imgProfile: '',
        birthday: birthday.value,
        rol: this.role,
      }
      
      this.firestore.createPlayer(datosUser, teamId.value, height.value, weight.value, position.value, secondPosition.value);

      this.firestore.addPlayerTeam(
        name.value, 
        lastname.value, 
        email.value, 
        tel.value, 
        birthday.value,
        height.value, 
        weight.value, 
        position.value, 
        secondPosition.value, 
        teamId.value
      );
      this.interaction.closeLoading();
      this.interaction.presentToast('Jugador registrado correctamente.');
      this.router.navigate(['/login']);
    }
  }

  onSelectChange(selectedValue){
    this.role = selectedValue.detail.value;
    console.log(this.role);
  }

  onSelectTypeCoach(selectedValue){
    this.typeCoach = selectedValue.detail.value;
    console.log(this.typeCoach);
  }

  onSelectCountry(selectedValue){
    this.teamCountry = selectedValue.detail.value;
    console.log(this.teamCountry);
  }

}
