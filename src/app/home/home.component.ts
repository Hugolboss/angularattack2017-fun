import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { GameService } from './../game/game.service';

@Component({
  selector: 'fun-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  providers: [GameService]
})
export class HomeComponent implements OnInit {

  game: string;
  constructor(public snackBar: MdSnackBar, private router: Router, private gameService: GameService) { }

  ngOnInit() {
  }

  handleToggle(e, value) {
    this.game = e.value;
  }

  createGame() {
    !this.game ?
      this.snack() :
      this.router.navigate(['/' + this.game + '/' + this.gameService.newGame()]);
  }

  findGame() {
    !this.game ?
      this.snack() :
      console.log('TODO: find a game');
  }

  private snack() {
    this.snackBar.open('Please select a game!', 'Close', {
        duration: 3000
      })
  }
}
