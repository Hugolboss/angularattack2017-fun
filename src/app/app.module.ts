import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'hammerjs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './game/results/results.component';
import { TictactoeModule } from './game/tictactoe/tictactoe.module';
import { BattleshipModule } from './game/battleship/battleship.module';
import { ChatModule } from './chat/chat.module';
import {DndModule} from "ng2-dnd";
import { CheckersModule } from './game/checkers/checkers.module';
import { FindComponent } from './find/find.component';
import {OthelloModule} from "./game/othello/othello.module";
import { StatisticsService } from './statistics/statistics.service';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    ResultsComponent,
    FindComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ButtonsModule,
    AppRoutingModule,
    DndModule.forRoot(),
    SharedModule,
    TictactoeModule,
    ChatModule,
    BattleshipModule,
    OthelloModule,
    CheckersModule
  ],
  providers: [AuthService, UsersService, StatisticsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
