import { Announcement } from './../models/announcement';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Team } from '../models/team';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  
  constructor( private firestore: AngularFirestore ) { }

  //Servicio de registro Jugadores
  async createAnnouncements(announcement:Announcement){
    const result = await this.firestore.collection('Announcement').doc(announcement.id).set(announcement);
    return result;
  }

  updateAnnouncement(datos: Announcement){
    this.firestore.collection('Announcement').add( datos );
  }

  deleteAnnouncements(id){
    this.firestore.collection('Announcement').doc(id).delete();
  }

  async getAnnouncementData(teamId: string){
    let datos = [];
    await this.firestore.collection("Announcement").ref.where("teamId", "==", teamId).orderBy('createdAt', 'desc')
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            let ann: Announcement = doc.data() as Announcement;
            ann.id = doc.id;
            datos.push(ann);
            // doc.data() is never undefined for query doc snapshots
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    return datos;
  }
}
