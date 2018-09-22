import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email: string
  items: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    afDB: AngularFireDatabase
  ) {

    this.items = afDB.list('tareas').valueChanges();

    afAuth.auth.onAuthStateChanged( usuario => {
      console.log(usuario);
      this.email = '';
      if(usuario){
        this.email = usuario.email;
      }
    });
  }

  signInWithSocial(social) {
    switch(social){
      case "facebook":
      this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider());
      break;

      case "google":
      this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());
      break;
    }

  }

  signOut() {
    this.afAuth.auth.signOut();
  }

}
