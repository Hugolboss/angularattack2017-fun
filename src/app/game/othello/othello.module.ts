import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OthelloComponent } from './othello/othello.component';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [OthelloComponent]
})
export class OthelloModule { }
