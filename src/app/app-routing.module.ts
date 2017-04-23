import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TictactoeComponent } from './game/tictactoe/tictactoe/tictactoe.component';
import { BattleshipComponent } from './game/battleship/battleship/battleship.component';
import { AuthGuard } from './auth-guard.service';
import { CheckersComponent } from './game/checkers/checkers/checkers.component';
import {OthelloComponent} from "./game/othello/othello/othello.component";
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

const routes: Routes = [
  // { path: 'tickTackToe/:id', component: TictactoeComponent, canActivate: [AuthGuard]} ,
  { path: 'tictactoe/:id', component: TictactoeComponent } ,
  { path: 'battleship/:id', component: BattleshipComponent } ,
  { path: 'othello/:id', component: OthelloComponent } ,
  { path: 'checkers/:id', component: CheckersComponent },
  { path: 'leaderboard/:id', component: LeaderboardComponent },
  { path: '', component: HomeComponent }
  // { path: '', redirectTo: 'home', pathMatch: 'full' }, // set default entry route to app component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
