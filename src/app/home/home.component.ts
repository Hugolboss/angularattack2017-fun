import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { GameService } from './../game/game.service';

import {AuthService} from '../auth.service';

@Component({
  selector: 'fun-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  providers: [GameService]
})
export class HomeComponent implements OnInit {

  game: string;
  user;

  constructor(private authService: AuthService, public snackBar: MdSnackBar, private router: Router, private gameService: GameService) {
    this.authService.getAuthObservable().subscribe(auth => {
      if (auth) {
        this.user = {
          displayName: auth.google.displayName,
          uid: auth.google.uid
        };
      } else {
        this.user = {};
      }
    });
  }

  ngOnInit() {
  }

  handleToggle(e) {
    this.game = e.value;
  }

  createGame() {
    !this.game ?
      this.snack() :
      this.router.navigate(['/' + this.game + '/' + this.gameService.newGame(this.prettyName(this.game), this.user)]);
  }

  findGame() {
    !this.game ?
      this.snack() :
      console.log('TODO: find a random game');
  }

  private snack() {
    this.snackBar.open('Please select a game!', 'Close', {
        duration: 3000
      });
  }

  private prettyName(name) {
    return {
      tictactoe: 'Tic Tac Toe',
      checkers: 'Checkers',
      battleship: 'Battleship'
    }[name];
  }
}
