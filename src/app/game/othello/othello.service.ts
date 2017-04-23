import {Injectable} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {MdDialog} from "@angular/material";
import {SkipDialogComponent} from "./skip-dialog/skip-dialog.component";
import _ from 'lodash';

@Injectable()
export class OthelloService {
  gameId;
  gameObservable;
  grid;
  game;
  players;

  constructor(private angularFire: AngularFire, public skipDialog: MdDialog) {
    this.grid = this.setGameGrid();
  }

  setGame(gameId) {
    this.gameId = gameId;
    this.gameObservable = this.angularFire.database.object('/games/' + this.gameId);
    this.gameObservable.subscribe(game => {
      this.players = game.players;
      if (game.players.length === 2 && !game.players[0].pieceCount) {
        this.players = game.players.map((p, i) => {
          p.ind = i;
          p.pieceColor = i === 0 ? 'white' : 'black';
          p.opponentColor = i === 0 ? 'black' : 'white';
          p.icon = i === 0 ? 'X' : 'O';
          p.pieceCount = 2;
          return p;
        });
        if (this.game && this.game.grid) {
          this.initializeGame();
          this.setStateDifferential();
          this.update(this.game.grid);
        }
        this.updatePlayers(this.players);
      }
      if (game.skipTurn) {
        this.skipDialog.open(SkipDialogComponent);
        const idx = this.players.find(p => p.uid === this.game.currentPlayer.uid).ind;
        const currentUser = this.switchPlayer(idx);
        this.setStateDifferential();
        this.skipTurn(false);
        this.combinedUpdate(this.game.grid, currentUser);
      }
      if (!game.grid) {
        this.InitUpdate();
      }
      return this.game = game;
    });
  }

  InitUpdate() {
    this.players[0] = Object.assign({},
      this.players[0],
      {
        icon: 'X'
      }
    );
    this.gameObservable.update({grid: this.grid, currentPlayer: this.players[0]});
  }

  update(grid) {
    this.gameObservable.update({grid});
  }

  skipTurn(shouldSkip: boolean) {
    this.gameObservable.update({skipTurn: shouldSkip})
  }

  combinedUpdate(grid, currentPlayer) {
    this.gameObservable.update({grid, currentPlayer});
  }

  updatePlayers(players) {
    this.gameObservable.update({players});
  }

  updateVictor(victor) {
    this.gameObservable.update({victor});
  }

  switchPlayer(idx) {
    if (idx === 0) {
      this.game.currentPlayer = this.players[1];
    } else {
      this.game.currentPlayer = this.players[0];
    }
    return this.game.currentPlayer;
  }

  setGameGrid() {
    const gameg = Array(8).fill(0).map((column, y) => {
      return Array(8).fill(0).map((row, x) => {
        return {
          active: false,
          state: {content: `${x}, ${y}`, x, y}, moveDifferential: []
        };
      });
    });

    gameg[3][3].active = true;
    gameg[3][4].active = true;
    gameg[4][3].active = true;
    gameg[4][4].active = true;

    gameg[3][3].state.content = 'X';
    gameg[3][4].state.content = 'O';
    gameg[4][3].state.content = 'O';
    gameg[4][4].state.content = 'X';
    return gameg;
  }

  private initializeGame() {
    this.game.grid[3][3].state.player = this.players[0];
    this.game.grid[3][4].state.player = this.players[1];
    this.game.grid[4][3].state.player = this.players[1];
    this.game.grid[4][4].state.player = this.players[0];
  }

  private hasMoves() {
    const flattenedGrid = _.flatten(this.game.grid);
    return flattenedGrid.some(cell => cell.moveDifferential && cell.moveDifferential.length);
  }

  setStateDifferential() {
    for (let i = 0; i < this.game.grid.length; i++) {
      const row = this.game.grid[i];
      for (let j = 0; j < row.length; j++) {
        const cell = this.game.grid[i][j];
        if (cell.active) {
          cell.moveDifferential = [];
        } else {
          // check row
          let availableOnRow = this.checkRow(cell);

          // check column
          let availableOnColumn = this.checkColumn(cell);

          // check diagonal
          let availableOnDiagonal = this.checkDiagonal(cell);

          // check antidiagonal
          let availableOnAntiDiagonal = this.checkAntiDiagonal(cell);

          cell.moveDifferential = [...availableOnRow, ...availableOnColumn, ...availableOnDiagonal, ...availableOnAntiDiagonal];
        }
      }
    }
  }

  private checkRow(cell) {
    const {x, y} = cell.state;
    const row = this.game.grid[y];

    return this.checkSet(row, x);
  }

  private checkColumn(cell) {
    const MAX_Y = 7;
    const column = [];
    const {x, y} = cell.state;
    for (let i = 0; i <= MAX_Y; i++) {
      column.push(this.game.grid[i][x]);
    }
    return this.checkSet(column, y)
  }

  private checkDiagonal(cell) {
    const MAX = 7;
    const diagonal = [];
    const {x, y} = cell.state;
    const closerToWall = Math.min(x, y);
    const dif = Math.abs(x - y);
    const startNode = this.game.grid[y - closerToWall][x - closerToWall];
    let currentCellIndex = 0;
    for (let i = 0; i <= MAX - dif; i++) {
      const currentY = startNode.state.y + i;
      const currentX = startNode.state.x + i;
      if (currentY === y && currentX === x) {
        currentCellIndex = diagonal.length;
      }
      diagonal.push(this.game.grid[currentY][currentX]);
    }
    return this.checkSet(diagonal, currentCellIndex);
  }

  private checkAntiDiagonal(cell) {
    const MAX = 7;
    const diagonal = [];
    const {x, y} = cell.state;
    const closerToWall = Math.min(x, MAX - y);
    const dif = Math.abs(MAX - (x + y));
    const startNode = this.game.grid[y + closerToWall][x - closerToWall];
    let currentCellIndex = 0;
    for (let i = 0; i <= MAX - dif; i++) {
      const currentY = startNode.state.y - i;
      const currentX = startNode.state.x + i;
      if (currentY === y && currentX === x) {
        currentCellIndex = diagonal.length;
      }
      diagonal.push(this.game.grid[currentY][currentX]);
    }
    return this.checkSet(diagonal, currentCellIndex);
  }

  private checkSet(set, cellIndex) {
    let diffPieces = [];

    // Check After
    let tempDiff = [];
    for (let i = 1; i < set.length - cellIndex; i++) {
      if (!set[cellIndex + i].state.player) {
        break;
      }
      if (set[cellIndex + i].state.player.uid !== this.game.currentPlayer.uid) {
        tempDiff.push({x: set[cellIndex + i].state.x, y: set[cellIndex + i].state.y});
      } else {
        diffPieces = diffPieces.concat(tempDiff);
        break;
      }
    }
    // Check Before
    tempDiff = [];
    for (let i = 1; i <= cellIndex; i++) {
      if (!set[cellIndex - i].state.player) {
        break;
      }
      if (set[cellIndex - i].state.player.uid !== this.game.currentPlayer.uid) {
        tempDiff.push({x: set[cellIndex - i].state.x, y: set[cellIndex - i].state.y});
      } else {
        diffPieces = diffPieces.concat(tempDiff);
        break;
      }
    }
    return diffPieces;
  }
}
