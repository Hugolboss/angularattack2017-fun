import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";

@Injectable()
export class ChatService {

  constructor(private af: AngularFire) { }

  submitMessage(room, message) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.af.database.list('/rooms/' + room).push({
          username: auth.auth.displayName,
          message : message
        });
      }
    });
    /*
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        firebase.database().ref('rooms/' + room ).push({
          username: user.displayName,
          message : message
        });
      } else {
        // No user is signed in.
      }
    });
    */
  }

  getRoomRef(room) {
    const roomsRef = firebase.database().ref('rooms/' + room).limitToLast(50);
    return roomsRef;
  }
}
