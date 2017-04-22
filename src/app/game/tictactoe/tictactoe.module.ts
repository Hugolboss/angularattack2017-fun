import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { TictactoeComponent } from './tictactoe/tictactoe.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [TictactoeComponent]
})
export class TictactoeModule {}
