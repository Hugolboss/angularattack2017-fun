import {Injectable} from '@angular/core';
import {AngularFire} from 'angularfire2';

@Injectable()
export class CheckersService {
  gameId;
  gameObservable;
  grid;
  game;
  players;
  constructor(private angularFire: AngularFire) {
    this.grid = this.setGameGrid();
  }

  setGame(gameId) {
    this.gameId = gameId;
    this.gameObservable = this.angularFire.database.object('/games/' + this.gameId);
    this.gameObservable.subscribe(game => {
      if (!game.grid) {
        this.InitUpdate();
      }
      this.players = game.players;
      return this.game = game;
    });
  }

  InitUpdate() {
    this.gameObservable.update({grid: this.grid, });
  }

  setGameGrid() {
    const gameg = Array(8).fill(1).map((row, x) => {
      return Array(8).fill(1).map((e, y) => {
        let content = `${x}, ${y}`;
        if (x <= 1) {
            content = 'black';
        }else if (x >= 6) {
            content = 'red';
        }
        return {row: x % 2 === 0 ? 'even' : 'odd' , active: false, state: {content: content, x, y, available: false}};
      });
    });
    return gameg;
  }

}
