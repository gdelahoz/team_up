import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserI } from './../models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireAuth: AngularFireAuth
    
    ) { }

  login(correo: string, password: string){
    return this.fireAuth.signInWithEmailAndPassword(correo, password);
  }

  logout(){
    this.fireAuth.signOut();
  }

  register(email: string, password: string){
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }
}
