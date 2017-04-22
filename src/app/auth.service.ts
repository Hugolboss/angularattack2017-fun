import {Injectable} from '@angular/core';

import 'firebase';

@Injectable()
export class AuthService {

  constructor() {
  }

  /*
   Use the following code to check auth status:
   firebase.auth().onAuthStateChanged(function(user) {
   if (user) {
   // User is signed in.
   } else {
   // No user is signed in.
   }
   });
   */

  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  logout() {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });
  }

}
