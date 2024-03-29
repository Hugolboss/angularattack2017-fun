import { Injectable } from '@angular/core';

import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class FindService {

  games: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) { }

  findGames = (game) => {
    return this.af.database.list('games/', {
      query: {
        orderByChild: 'game',
        equalTo: this.prettyName(game)
      }
    }).map(g => g.filter(game => 
        game.players && game.players.length === 1
        && game.state && game.state !== 'abandoned'
      ))
  }

  private prettyName(name) {
    return {
      tictactoe: 'Tic Tac Toe',
      checkers: 'Checkers',
      othello: 'Othello'
    }[name];
  }
}
