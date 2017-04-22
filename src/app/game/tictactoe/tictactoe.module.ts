import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {CellComponent} from '../board/cell.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CellComponent
  ],
  declarations: []
})
export class TictactoeModule { }
