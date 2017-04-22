import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ChatService} from './chat.service';

@Component({
  selector: 'fun-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  messages = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getRoomRef('global').on('child_added', (snapshot) => {
      this.setMessages(snapshot.val());
    });
  }

  setMessages(val) {
    this.messages.push(val);
    this.scrollToBottom();
  }

  onEnter(val) {
    this.chatService.submitMessage('global', val);
  }

  scrollToBottom(): void {
    try {
      //this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight + 20;
      this.myScrollContainer.nativeElement.scrollIntoView();
    } catch (err) { }
  }
}
