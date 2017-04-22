import { Injectable } from '@angular/core';

import 'firebase';

@Injectable()
export class ChatService {

  constructor() { }

  submitMessage(room, message) {
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
  }

  getRoomRef(room) {
    const roomsRef = firebase.database().ref('rooms/' + room).limitToLast(50);
    return roomsRef;
  }
}
