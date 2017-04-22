import { Component, OnInit } from '@angular/core';
import {ChatService} from './chat.service';

@Component({
  selector: 'fun-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit {

  messages = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getRoomRef('global').on('child_added', (snapshot) => {
      this.setMessages(snapshot.val());
    });
  }

  setMessages(val) {
    this.messages.push(val);
  }

  onEnter(val) {
    this.chatService.submitMessage('global', val);
  }
}
