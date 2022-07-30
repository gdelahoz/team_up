import { Event } from './../models/event';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor( private firestore: AngularFirestore ) { }

  //Servicio de registro Jugadores
  async createEvents(event:Event){
    const result = await this.firestore.collection('Event').doc(event.id).set(event);
    return result;
  }

  updateEvent(datos: Event){
    this.firestore.collection('Event').doc(datos.id).set(datos);
  }

  deleteEvent(id){
    this.firestore.collection('Event').doc(id).delete();
  }

  async getEventData(teamId: string){
    let datos = [];
    await this.firestore.collection("Event").ref.where("teamId", "==", teamId).orderBy('createdAt', 'desc')
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            let event: Event = doc.data() as Event;
            event.id = doc.id;
            datos.push(event);
            // doc.data() is never undefined for query doc snapshots
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    return datos;
  }
}
