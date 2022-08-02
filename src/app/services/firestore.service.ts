import { Player } from './../models/player';
import { Team } from './../models/team';
import { UserI } from './../models/user';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Coach } from '../models/coach';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs/internal/Observable';

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

  // USUARIOS
  async createCoach(user: UserI){
    const result = await this.firestore.collection('Users').doc(user.uid).set(user);
    return result;
  }

  async createPlayer(user:UserI, player:Player, uid: string){
    const result = await this.firestore.collection('Users').doc(uid).set(user);
    this.firestore.collection('Players').doc(uid).set(player);
    return result;
  }

  editUser(userId: string, datosUser: any){
    this.firestore.collection('Users').doc(userId).update( datosUser );
  }

  editPlayer(userId: string, datosPlayer: any){
    this.firestore.collection('Players').doc(userId).update( datosPlayer );
  }
  
  //Sevicio obtención datos del usuario
  getUserData(id: string) : Observable<UserI>{
    try {
      const rolDoc: AngularFirestoreDocument<UserI> = this.firestore.doc<UserI>(
        `Users/${id}`
      );
      return rolDoc.snapshotChanges().pipe(
        map((action) => {
          if (action.payload.exists === false) {
            return null;
          } else {
            const data = action.payload.data() as UserI;
            data.uid = action.payload.id;
            return data;
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  //Sevicio obtención datos del usuario
  getPlayerData(id: string) : Observable<Player>{
    try {
      const rolDoc: AngularFirestoreDocument<Player> = this.firestore.doc<Player>(
        `Players/${id}`
      );
      return rolDoc.snapshotChanges().pipe(
        map((action) => {
          if (action.payload.exists === false) {
            return null;
          } else {
            const data = action.payload.data() as Player;
            data.id = action.payload.id;
            return data;
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  }


  // EQUIPOS
  async createTeam(team: Team){
    const result = await this.firestore.collection('Team').add(team);
    return result;
  }

  getTeamData(id: string) : Observable<Team>{
    try {
      const rolDoc: AngularFirestoreDocument<Team> = this.firestore.doc<Team>(
        `Team/${id}`
      );
      return rolDoc.snapshotChanges().pipe(
        map((action) => {
          if (action.payload.exists === false) {
            return null;
          } else {
            const data = action.payload.data() as Team;
            data.id = action.payload.id;
            return data;
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
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
