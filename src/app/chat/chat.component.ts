import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ChatService} from './chat.service';

import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {AuthService} from "../auth.service";

@Component({
  selector: 'fun-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  // messages = [];
  messages: FirebaseListObservable<any[]>;
  rooms = [];
  selectedRoom = 'global';
  roomObservable: FirebaseListObservable<any[]>;

  constructor(private chatService: ChatService, private af: AngularFire, private authService: AuthService) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.messages = chatService.getRoomRef(); // af.database.list('/rooms/global/');
        this.roomObservable = this.af.database.list('/users/' + auth.auth.uid + '/rooms/');
        this.roomObservable.subscribe(snapshot => {
          snapshot.unshift({$key: 'global', $value: 'Global'});
          this.rooms = snapshot;
        });
      }
    });
  }

  ngOnInit() {
  }

  selectRoom() {
    this.messages = this.chatService.setRoom(this.selectedRoom); // af.database.list('/rooms/global/');
  }

  onEnter(val) {
    this.chatService.submitMessage(val);
  }
}
