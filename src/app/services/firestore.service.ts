import { Player } from './../models/player';
import { Team } from './../models/team';
import { UserI } from './../models/user';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Coach } from '../models/coach';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  createDoc(data:any, path:string, id:string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  //Servicio de registro Entrenadores
  async createCoach(user: UserI, teamId: string, type: string){
    const result = await this.firestore.collection('Users').add(user);
    const datosCoach: Coach = {
      userId: result.id,
      teamId: teamId,
      typeCoach: type
    }
    this.firestore.collection('Coaches').add(datosCoach);
    return result;
  }

  //Servicio de registro Jugadores
  async createPlayer(user:UserI, teamId: string, height, weight, position, secondPosition){
    const result = await this.firestore.collection('Users').add(user);
    const datosPlayer: Player = {
      userId: result.id,
      teamId: teamId,
      weight: weight,
      height: height,
      position: position,
      secondPosition: secondPosition,
      dorsal: '',
      attendance: 0
    }
    this.firestore.collection('Players').add(datosPlayer);
    return result;
  }

  async createTeam(team: Team){
    const result = await this.firestore.collection('Team').add(team);
    return result;
  }

  editTeam(teamId: string, datos: any){
    this.firestore.collection('Team').doc(teamId).update( datos );
  }

  async addCoachTeam(name, lastname, email, tel, birthday, rol, teamId){
    const result = await this.firestore.collection('Team').doc(teamId).ref.get().then((snapshot)=>{
      var data = snapshot.data()
      data['coaches'].push({
        birthday: birthday,
        email: email,
        lastName: lastname,
        name: name,
        rol: rol,
        tel: tel
      })
      this.firestore.collection('Team').doc(teamId).ref.update(data)
    });
  }

  async addPlayerTeam(name, lastname, email, tel, birthday, height, weight, position, secondPosition, teamId){
    const result = await this.firestore.collection('Team').doc(teamId).ref.get().then((snapshot)=>{
      var data = snapshot.data()
      data['players'].push({
        birthday: birthday,
        email: email,
        lastName: lastname,
        name: name,
        tel: tel,
        imgProfile: '',
        height: height,
        weight: weight,
        position: position,
        secondPosition: secondPosition,
        dorsal: '',
        attendance: 0
      })
      this.firestore.collection('Team').doc(teamId).ref.update(data)
    });
  }


  getId(){
    return this.firestore.createId();
  }

}
