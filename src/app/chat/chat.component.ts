import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ChatService} from './chat.service';

import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'fun-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  // messages = [];
  messages: FirebaseListObservable<any[]>;

  constructor(private chatService: ChatService, private af: AngularFire) {
    this.messages = af.database.list('/rooms/global/');
  }

  ngOnInit() {
    // this.chatService.getRoomRef('global').on('child_added', (snapshot) => {
      // this.setMessages(snapshot.val());
    // });
  }

  setMessages(val) {
    // this.messages.push(val);
  }

  onEnter(val) {
    this.chatService.submitMessage('global', val);
  }
}
