import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TictactoeComponent } from './game/tictactoe/tictactoe/tictactoe.component';
import { BattleshipComponent } from "./game/battleship/battleship/battleship.component";
import { AuthGuard } from './auth-guard.service';
import { CheckersComponent } from './game/checkers/checkers/checkers.component'
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // { path: 'tickTackToe/:id', component: TictactoeComponent, canActivate: [AuthGuard]} ,
  { path: 'tictactoe/:id', component: TictactoeComponent } ,
  { path: 'battleship/:id', component: BattleshipComponent } ,
  { path: 'checkers/:id', component: CheckersComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, //set default entry route to app component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
