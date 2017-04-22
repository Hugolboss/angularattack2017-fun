import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";

@Injectable()
export class ChatService {
  private room: string;

  constructor(private af: AngularFire) {
    this.setRoom('global');
  }

  submitMessage(message) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.af.database.list('/rooms/' + this.room).push({
          username: auth.auth.displayName,
          message : message
        });
      }
    });
  }

  getRoomRef() {
    return this.af.database.list('/rooms/' + this.room, {query:{limitToLast: 50}});
  }

  setRoom(room) {
    this.room = room;
    return this.getRoomRef();
  }
}
