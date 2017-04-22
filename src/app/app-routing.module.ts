import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'tictactoe',
    loadChildren: 'app/game/tictactoe/tictactoe.module#TicTacToeModule',
  },
  {
    path: 'checkers',
    loadChildren: 'app/game/checkers/checkers.module#CheckersModule',
  },
  {
    path: 'stats',
    loadChildren: 'app/game/stats/stats.module#StatsModule',
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, //set default entry route to app component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
