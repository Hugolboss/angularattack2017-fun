import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class TictactoeService {
  gameId: string;
  gameObservable;
  grid = Array(3).fill(0).map((column, y) => {
    return Array(3).fill(0).map((row, x) => {
      return {active: false, state: {content: `${x}, ${y}`, x, y}};
    });
  });

  constructor(private fire: AngularFire) {
  }

  getGrid() {
    return this.grid;
  }

  setGameId(id) {
    this.gameId = id;
    this.gameObservable = this.fire.database.object('/games/' + this.gameId);
  }

  setInitGrid() {
    this.gameObservable.update({grid: this.grid});
  }

  update(game) {
    this.gameObservable.update(game);
  }


}
