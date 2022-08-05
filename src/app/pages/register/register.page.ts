import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Player } from './../../models/player';
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
  userForm: FormGroup;
  teamForm: FormGroup;
  assistForm: FormGroup;
  playerForm: FormGroup;
  isSubmitted = false;
  maxDate = "2018-12-31";
  maxDateNow = new Date().toISOString().split("T")[0];

  constructor(
    private router: Router,
    private auth: AuthService,
    private firestore: FirestoreService,
    private interaction: InteractionService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(9999999), Validators.max(999999999999)]],
      birthday: ['', [Validators.required]],
      password: ['', [Validators.required,  Validators.maxLength(30), Validators.minLength(6)]],
    })
    this.teamForm = this.formBuilder.group({
      teamname: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      country: ['', [Validators.required]],
      campus: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      teamBirthday: ['', [Validators.required]]
    })
    this.playerForm = this.formBuilder.group({
      height: ['', [Validators.required, Validators.min(60), Validators.max(250)]],
      weight: ['', [Validators.required, Validators.min(30), Validators.max(150)]],
      position: ['', [Validators.required]],
      secondPosition: ['', [Validators.required]],
      teamId: ['', [Validators.required]],
    })
    this.assistForm = this.formBuilder.group({
      teamId: ['', [Validators.required]],
    })
  }
  
  get errorControlUser() {
    return this.userForm.controls;
  }

  get errorControlTeam() {
    return this.teamForm.controls;
  }

  get errorControlPlayer() {
    return this.playerForm.controls;
  }

  get errorControlAssist() {
    return this.assistForm.controls;
  }

  //Registro de entrenador y equipo
  async registerCoachAndTeam(name, lastname, email, tel, birthday, password, teamName, campus, teamBirthday){
    await this.interaction.showLoading('Registrando...');
    this.isSubmitted = true;
    if (!this.userForm.valid || !this.teamForm.valid) {
      this.interaction.closeLoading();
      return false;
    } else {
      const result = await this.auth.register(email.value, password.value).catch(error => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Ocurrió un error al crear usuario entrenador');
      })
  
      if (result) {
        const id = result.user.uid;
  
        const datosTeam: Team = {
          name: teamName.value,
          description: '',
          imgLogo: '',
          imgBanner: '',
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
        this.firestore.createCoach(datosUser);
  
        /*const datosCoach: UserI = {
          name: name.value,
          lastName: lastname.value,
          email: email.value,
          tel: tel.value,
          birthday: birthday.value,
          rol: this.role
        }
        this.firestore.editTeam(resultTeam.id, {coaches: [datosCoach]});*/
  
        this.interaction.closeLoading();
        this.interaction.presentToast('Usuario registrado correctamente, inicia sesión para continuar.');
        this.router.navigate(['/login']);
      }
    }
  }

  //Registro de asistente
  async registerAssistCoach(name, lastname, email, tel, birthday, password, teamId){
    await this.interaction.showLoading('Registrando...');
    this.isSubmitted = true;
    if (!this.userForm.valid || !this.assistForm.valid) {
      this.interaction.closeLoading();
      return false;
    } else {
      const result = await this.auth.register(email.value, password.value).catch(error => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Ocurrió un error al crear usuario entrenador.');
      })
  
      if (result) {
        console.log('Usuario asistente registrado correctamente.');
        const id = result.user.uid;
  
        const datosUser: UserI = {
          uid: id,
          teamId: teamId.value,
  
          name: name.value,
          lastName: lastname.value,
          email: email.value,
          imgProfile: '',
          tel: tel.value,
          birthday: birthday.value,
          rol: this.role
        }
        this.firestore.createCoach(datosUser);
  
        /*this.firestore.addCoachTeam(
          name.value, 
          lastname.value, 
          email.value,
          tel.value, 
          birthday.value,
          this.role, 
          teamId.value
        );*/
  
        this.interaction.closeLoading();
        this.interaction.presentToast('Usuario registrado correctamente, inicia sesión para continuar.');
        this.router.navigate(['/login']);
      }
    }
  }

  //Registro de jugador
  async registerPlayer(name, lastname, email, tel, birthday, password, height, weight, position, secondPosition, teamId){
    await this.interaction.showLoading('Registrando...');
    this.isSubmitted = true;
    if (!this.userForm.valid || !this.playerForm.valid) {
      this.interaction.closeLoading();
      return false;
    } else {
      const result = await this.auth.register(email.value, password.value).catch(error => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Ocurrió un error al registrar jugador.');
      })
  
      if (result) {
        console.log('Usuario jugador registrado correctamente.');
        const id = result.user.uid;
  
        const datosUser: UserI = {
          uid: id,
          teamId: teamId.value,
          
          name: name.value,
          lastName: lastname.value,
          email: email.value,
          tel: tel.value,
          imgProfile: '',
          birthday: birthday.value,
          rol: this.role,
        }
  
        const datosPlayer: Player = {
          teamId: teamId.value,
          userId: id,
          
          height: height.value,
          weight: weight.value,
          position: position.value,
          secondPosition: secondPosition.value,
          dorsal: '',
          attendance: ''
        }
        
        this.firestore.createPlayer(datosUser, datosPlayer, id);
  
        /*this.firestore.addPlayerTeam(
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
        );*/
  
        this.interaction.closeLoading();
        this.interaction.presentToast('Jugador registrado correctamente.');
        this.router.navigate(['/login']);
      }
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

  showPassword(input: any, icon: any): any {
    input.type = input.type === 'password' ?  'text' : 'password';
    icon.name = icon.name === 'eye' ? 'eye-off' : 'eye';
  }

}
