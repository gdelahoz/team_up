import { Event } from './../models/event';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserI } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor( private firestore: AngularFirestore ) { }

  //Servicio de registro eventos
  async createEvents(event:Event){
    const result = await this.firestore.collection('Event').doc(event.id).set(event);
    return result;
  }

  updateEvent(eventId, datos: any){
    this.firestore.collection('Event').doc(eventId).update(datos);
  }

  deleteEvent(id){
    this.firestore.collection('Event').doc(id).delete();
  }

  // Sevicio obtención datos del evento
  getEventData(id: string) : Observable<Event>{
    try {
      const rolDoc: AngularFirestoreDocument<Event> = this.firestore.doc<Event>(
        `Event/${id}`
      );
      return rolDoc.snapshotChanges().pipe(
        map((action) => {
          if (action.payload.exists === false) {
            return null;
          } else {
            const data = action.payload.data() as Event;
            data.id = action.payload.id;
            return data;
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getEvents(teamId: string){
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

  // Asistencias
  async addAttendance(eventId, userId){
    const result = await this.firestore.collection('Event').doc(eventId).ref.get().then((snapshot)=>{
      var data = snapshot.data()
      data['attendance'].push({
        userId: userId
      })
      this.firestore.collection('Event').doc(eventId).ref.update(data)
    });
  }

  async getAttendance(attList){
    let attendance = [];
    await this.firestore.collection("Users").ref.where("uid", "in", attList)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            let user: UserI = doc.data() as UserI;
            user.uid = doc.id;
            attendance.push(user);
            // doc.data() is never undefined for query doc snapshots
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    return attendance;
  }

  // Ausencias
  async addAbsence(eventId, userId, info){
    const result = await this.firestore.collection('Event').doc(eventId).ref.get().then((snapshot)=>{
      var data = snapshot.data()
      data['absence'].push({
        userId: userId,
        info: info 
      })
      this.firestore.collection('Event').doc(eventId).ref.update(data)
    });
  }

  async getAbsence(absList){
    let absence = [];
    await this.firestore.collection("Users").ref.where("uid", "in", absList)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            let user: UserI = doc.data() as UserI;
            user.uid = doc.id;
            absence.push(user);
            // doc.data() is never undefined for query doc snapshots
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    return absence;
  }
}
