import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { LeaderboardComponent } from './leaderboard.component';
import { MaterialModule } from './../shared/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [LeaderboardComponent]
})
export class LeaderboardModule { }
