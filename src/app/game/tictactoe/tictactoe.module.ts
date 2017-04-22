import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { TictactoeComponent } from './tictactoe/tictactoe.component';
import {TictactoeService} from './tictactoe.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [TictactoeService],
  declarations: [TictactoeComponent]
})
export class TictactoeModule {}
