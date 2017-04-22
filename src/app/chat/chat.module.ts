import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ChatService } from './chat.service';
import { ChatComponent } from './chat.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ChatComponent
  ],
  declarations: [
    ChatComponent
  ],
  providers: [ChatService]
})
export class ChatModule { }
