import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fAuth: AngularFireAuth
  ) { }

  signInWithGoogle(){
    return this.createUser(new GoogleAuthProvider())
  }

  createUser(provider){
    return this.fAuth.signInWithPopup(provider).then(result=>{
      return true;
    }).catch((error)=>{
      return false;
    })
  }

  signOut(){
    return this.fAuth.signOut();
  }
}
