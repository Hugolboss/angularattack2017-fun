import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { GameService } from './../game/game.service';

import {AuthService} from '../auth.service';
import { User } from './../user';

@Component({
  selector: 'fun-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  providers: [GameService]
})
export class HomeComponent implements OnInit {

  game: string;
  gameNamePretty: string;
  user;

  constructor(private authService: AuthService, public snackBar: MdSnackBar, private router: Router, private gameService: GameService) {
    this.authService.getAuthObservable().subscribe(auth => {
      if (auth) {
        const u = {
          username: auth.auth.displayName,
          uid: auth.uid,
          profile_picture: auth.auth.photoURL,
          email: auth.auth.email
        };
        this.user = new User(u);
      } else {
        this.user = new User();
      }
    });
  }

  ngOnInit() {
  }

  handleToggle(e) {
    this.game = e.value;
    this.gameNamePretty = this.prettyName(e.value);
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
    this.snackBar.open('Please select a game type', 'Close', {
        duration: 3000
      });
  }

  public prettyName(name) {
    return {
      tictactoe: 'Tic Tac Toe',
      checkers: 'Checkers',
      othello: 'Othello'
    }[name];
  }
}
