import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OthelloComponent } from './othello/othello.component';
import { SharedModule } from "../../shared/shared.module";
import { OthelloService } from "./othello.service";
import { SkipDialogComponent } from './skip-dialog/skip-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [OthelloService],
  declarations: [OthelloComponent, SkipDialogComponent],
  entryComponents: [SkipDialogComponent]
})
export class OthelloModule { }
