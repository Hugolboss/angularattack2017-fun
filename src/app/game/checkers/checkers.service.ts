import {Injectable} from '@angular/core';
import {AngularFire} from 'angularfire2';

@Injectable()
export class CheckersService {
  gameId;
  gameObservable;
  grid;
  gameObj;

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
      return this.gameObj = game;
    });
  }

  InitUpdate() {
    this.gameObservable.update({grid: this.grid});
  }

  setGameGrid() {
    const gameg = Array(8).fill(1).map((row, x) => {
      return Array(8).fill(1).map((e, y) => {
        return {active: false, state: {content: `${x}, ${y}`, x, y}};
      });
    });
    return gameg;
  }

}
