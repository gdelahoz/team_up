import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { debug } from 'console';
import { Player } from '../models/player';
import { UserI } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private firestore: AngularFirestore) { }

  async getUserTeam(teamId, rol){
    let usersTeam = [];
    await this.firestore.collection("Users").ref.where("teamId", "in", [teamId]).where("rol", "==", rol)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            let user: UserI = doc.data() as UserI;
            user.uid = doc.id;
            usersTeam.push(user);
            // doc.data() is never undefined for query doc snapshots
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    return usersTeam;
  }

  async getPlayerTeam(teamId, rol, position){
    debugger
    let playersTeam = [];
    let userPlayer: UserI;
    await this.firestore.collection("Users").ref.where("teamId", "in", [teamId]).where("rol", "==", rol)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            let user = doc.data() as UserI;
            user.uid = doc.id;
            userPlayer = user;
            //playersTeam.push(user);
            // doc.data() is never undefined for query doc snapshots
        });
    })
    await this.firestore.collection("Players").ref.where("teamId", "in", [teamId]).where("position", "==", position)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            let player: Player = doc.data() as Player;
            player.userId = doc.id;
            Object.assign(userPlayer, player);
            playersTeam.push(userPlayer);
            // doc.data() is never undefined for query doc snapshots
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    return playersTeam;
  }
}
