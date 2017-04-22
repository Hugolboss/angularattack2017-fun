import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattleshipComponent } from './battleship/battleship.component';
import {SharedModule} from "../../shared/shared.module";
import { PiecesComponent } from './pieces/pieces.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [BattleshipComponent, PiecesComponent]
})
export class BattleshipModule { }
