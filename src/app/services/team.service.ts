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

  async getUserTeam(teamId, rol) {
    let usersTeam = [];
    await this.firestore.collection("Users").ref.where("teamId", "in", [teamId]).where("rol", "==", rol)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let user: UserI = doc.data() as UserI;
          user.uid = doc.id;
          usersTeam.push(user);
          // doc.data() is never undefined for query doc snapshots
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    return usersTeam;
  }

  async getPlayerTeam(teamId, rol, position) {
    //debugger
    let users = [];
    let players = [];

    await this.firestore.collection("Players").ref.where("teamId", "==", teamId).where("position", "in", position)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let player: Player = doc.data() as Player;
          player.userId = doc.id;
          players.push(player);
          // doc.data() is never undefined for query doc snapshots
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

    await this.firestore.collection("Users").ref.where("teamId", "==", teamId).where("rol", "==", rol).where("uid", "in", players.map( (player) => player = player.userId))
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let user = doc.data() as UserI;
          user.uid = doc.id;
          users.push(user);
          // doc.data() is never undefined for query doc snapshots
        });
      })

    console.log("usersMap: ", users.map( (user) => user = user.uid));


    const users2 = users.map(
      (user) => {
        let player = players.find((player) => player.userId === user.uid);
        let obj = Object.assign({}, user, player);
        return obj;
      }
    );
    console.log("users2: ", users2);


    return users2;
  }
}
