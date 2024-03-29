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
      this.players = game.players;
      if (game.players.length === 2 && !game.players[0].pieceCount) {

      this.players = game.players.map( (p, i) => {
        p.ind = i;
        p.icon = i === 0 ? 'red' : 'black';
        p.opponentColor = i === 0 ? 'black' : 'red';
        p.pieceCount = 12;
        return p;
      });
      this.updatePlayersAndCurrent(this.players, this.players[0]);
    }
      if (!game.grid) {
        this.InitUpdate();
      }
      return this.game = game;
    });
  }

  InitUpdate() {
    this.gameObservable.update({grid: this.grid});
  }

  update(grid) {
    this.gameObservable.update({grid: grid});
  }
  updatePlayers(players) {
    this.gameObservable.update({players: players});
  }
  updatePlayersAndCurrent(players, current) {
    this.gameObservable.update({players: players, currentPlayer: current});
  }
  updateCurrentPlayer(player) {
    this.gameObservable.update({currentPlayer: player});
  }
  updateFull(grid, players, victor) {
    if (victor) {

    }
    this.gameObservable.update({grid: grid, players: players, victor});
  }
  updateState (state) {
    this.gameObservable.update({state: state});
  }
  updateUser () {

  }

  setGameGrid() {
    const gameg = Array(8).fill(1).map((row, x) => {
      return Array(8).fill(1).map((e, y) => {
        let content = ``;
        if (x <= 2) {
          (x % 2 === 0 && y % 2 !== 0) ? content = 'black' : '';
          (x % 2 !== 0 && y % 2 === 0) ? content = 'black' : '';
        } else if (x >= 5) {
          (x % 2 === 0 && y % 2 !== 0) ? content = 'red' : '';
          (x % 2 !== 0 && y % 2 === 0) ? content = 'red' : '';
        }
        return {row: x % 2 === 0 ? 'even' : 'odd', active: false, state: {content: content, x, y, available: false, king: false}};
      });
    });
    return gameg;
  }

}
