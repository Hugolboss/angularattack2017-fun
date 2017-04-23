import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckersComponent } from './checkers/checkers.component';
import {SharedModule} from '../../shared/shared.module';
import {CheckersService} from './checkers.service';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [CheckersService],
  declarations: [CheckersComponent]
})
export class CheckersModule { }
