import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import initializeApp = firebase.initializeApp;
import {AngularFire} from "angularfire2";
import {AuthService} from "../../../auth.service";

@Component({
  selector: 'fun-othello',
  templateUrl: './othello.component.html',
  styleUrls: ['./othello.component.less']
})
export class OthelloComponent implements OnInit {
  gameId;
  me;
  grid;
  game;
  symbols = ['x', 'o'];
  players = [
    {id: 123435, name: 'player1', icon: '', ind: -1},
    {id: 678998, name: 'player2', icon: '', ind: -1}
  ];
  currentPlayer;
  victor;

  constructor(private route: ActivatedRoute, private fire: AngularFire, private authService: AuthService) {
    this.authService.getAuthObservable().subscribe(auth => {
      this.me = {
        uid: auth.auth.uid,
        name: auth.auth.displayName
      }
    });
  }

  ngOnInit() {
    this.grid = Array(8).fill(0).map((column, y) => {
      return Array(8).fill(0).map((row, x) => {
        return {active: false, state: {content: `${x}, ${y}`, x, y}};
      });
    });

    this.players = this.players.map((player, i) => {
      player.ind = i;
      player.icon = this.symbols[i];
      return player;
    });
    if (!this.currentPlayer) {
      this.currentPlayer = this.players[0];
    }

    this.initializeGame();

    this.route.params
      .switchMap((params: Params) => {
        this.gameId = params['id'];
        return this.fire.database.object('/games/' + this.gameId);
      })
      .subscribe(game => {
        this.game = game;
        if (!game.grid) {
          this.initGame(this.gameId);
        }
        return this.game;
      });
  }

  initGame(id) {
    let ob = this.fire.database.object(`/games/${id}`);
    this.game.players = this.game.players.map((play, i) => {
      play.icon = this.symbols[i];
      return play;
    });
    ob.update({grid: this.grid, currentPlayer: this.game.players[0], victor: '', players: this.game.players});
  }

  update() {
    let ob = this.fire.database.object('/games/' + this.gameId);
    ob.update({grid: this.game.grid, currentPlayer: this.game.currentPlayer});
  }

  declareVictory(winner) {
    let ob = this.fire.database.object('/games/' + this.gameId);
    ob.update({victor: winner});
  }

  switchPlayer(idx) {
    if (idx === 0) {
      this.game.players[1].icon = this.symbols[1];
      this.game.currentPlayer = this.game.players[1];
    } else {
      this.game.currentPlayer = this.game.players[0];
    }
  }

  onClick(state) {
    let curr = this.game.currentPlayer;
    if (curr.id !== this.me.uid){
      return;
    }
    this.game.grid[state.y][state.x].state.content = this.game.currentPlayer.icon;
    this.game.grid[state.y][state.x].active = true;

    this.switchPlayer(this.game.players.find(p => p.id === curr.id));
    this.update();
    if (this.victor) {
      this.declareVictory(this.victor);
    }
  }

  onMouseOver(cell) {
    if (!cell.active /* && this.isAvailableMove(cell) */ ) {
      cell.state.content = this.currentPlayer.icon;
    }
  }

  onMouseOut(cell) {
    if (!cell.active) {
      cell.state.content = `${cell.state.x}, ${cell.state.y}`;
    }
  }

  isAvailableMove(cell) {
    let availableMove = false;

    // check row
    let availableOnRow = this.checkRow(cell);

    // check column
    let availableOnColumn = this.checkColumn(cell);

    // check diagonal
    let availableOnDiagonal = this.checkDiagonal(cell);

    // check anti-diagonal
    let availableOnAntiDiagonal = this.checkAntiDiagonal(cell);
  }

  private checkRow(cell) {
    const row = this.grid[cell.state.y];
    const x = cell.state.x;
    let hasNeighbors = false;

    if (x === 0) {
      hasNeighbors = Boolean(row[1].state.player);
    } else if (x === 7) {
      hasNeighbors = Boolean(row[7].state.player);
    } else {
      hasNeighbors = row[x - 1].state.player || row[x + 1].state.player;
    }

    if (!hasNeighbors) {
      return false;
    }

  }

  private checkColumn(cell) {

  }

  private checkDiagonal(cell) {

  }

  private checkAntiDiagonal(cell) {

  }

  private initializeGame() {
    this.grid[3][3].state.player = this.players[0];
    this.grid[3][4].state.player = this.players[1];
    this.grid[4][3].state.player = this.players[1];
    this.grid[4][4].state.player = this.players[0];

    this.grid[3][3].active = true;
    this.grid[3][4].active = true;
    this.grid[4][3].active = true;
    this.grid[4][4].active = true;

    this.grid[3][3].state.content = this.players[0].icon;
    this.grid[3][4].state.content = this.players[1].icon;
    this.grid[4][3].state.content = this.players[1].icon;
    this.grid[4][4].state.content = this.players[0].icon;
  }
}
