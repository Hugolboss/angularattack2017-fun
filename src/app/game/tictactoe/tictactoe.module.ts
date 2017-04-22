import {Input, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';

import { TictactoeComponent } from './tictactoe/tictactoe.component';
import {ActivatedRoute} from '@angular/router' ;
import {BoardComponent} from '../board/board.component';
import {CellComponent} from '../board/cell.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,

  ],
  declarations: [TictactoeComponent, BoardComponent, CellComponent]
})
export class TictactoeModule {}
