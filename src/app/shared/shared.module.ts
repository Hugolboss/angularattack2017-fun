import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { MaterialModule } from './material/material.module';
import { BoardComponent } from "../game/board/board.component";
import { CellComponent } from "../game/board/cell.component";
import { PlayerInfoComponent } from "../game/tictactoe/player-info/player-info.component";
import {DndModule} from "ng2-dnd";

export const firebaseConfig = {
  apiKey: 'AIzaSyBzEkk_MxsZyRjJzTKjQ68Uc-wEgRcXbEY',
  authDomain: 'angularattack2017-fun.firebaseapp.com',
  databaseURL: 'https://angularattack2017-fun.firebaseio.com',
  projectId: 'angularattack2017-fun',
  storageBucket: 'angularattack2017-fun.appspot.com',
  messagingSenderId: '315211112223'
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
    DndModule.forRoot()
  ],
  declarations: [BoardComponent, CellComponent, PlayerInfoComponent],
  exports: [
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    BoardComponent,
    CellComponent,
    PlayerInfoComponent,
    DndModule
  ]
})
export class SharedModule { }
