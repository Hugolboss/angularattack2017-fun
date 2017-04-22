import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TictactoeComponent } from './game/tictactoe/tictactoe/tictactoe.component';
import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // { path: 'tickTackToe/:id', component: TictactoeComponent, canActivate: [AuthGuard]} ,
  { path: 'tickTackToe/:id', component: TictactoeComponent } ,
  
  { path: '', redirectTo: '/home', pathMatch: 'full' }, //set default entry route to app component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
