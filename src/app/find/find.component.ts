import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from './../game/game.service';
import { FindService } from './find.service';

@Component({
  selector: 'fun-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.less'],
  providers: [FindService, GameService]
})
export class FindComponent implements OnInit {
  @Input() game: string;
  @Input() user;
  games;
  constructor(private findService: FindService, private router: Router, private gameService: GameService) { }

  ngOnInit() {}

  ngOnChanges() {
    this.games = this.findService.findGames(this.game);
  }

  joinAvailableGame(key, game) {
    this.gameService.joinGame(key, this.user);
    this.router.navigate(['/' + this.uglyName(game) + '/' + key]);
  }

  private uglyName(name) {
    return {
      'Tic Tac Toe': 'tictactoe',
      'Checkers': 'checkers',
      'Othello': 'othello'
    }[name];
  }
}
