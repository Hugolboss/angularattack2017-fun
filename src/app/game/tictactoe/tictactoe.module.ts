import {Input, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';

import { TictactoeComponent } from './tictactoe/tictactoe.component';
import {ActivatedRoute} from '@angular/router' ;

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [TictactoeComponent]
})
export class TictactoeModule {}
