import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'fun-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.less']
})
export class TictactoeComponent implements OnInit {
  gameId;
  grid;
  game;
  symbols = ['x', 'o'];
  players = [
    {id: 123435, name: 'player1', icon: '', ind: -1},
    {id: 678998, name: 'player2', icon: '', ind: -1}
  ];
  currentPlayer;
  victor;

  constructor(private route: ActivatedRoute, private fire: AngularFire) {
  }

  ngOnInit() {
    this.grid = Array(3).fill(0).map((column, y) => {
      return Array(3).fill(0).map((row, x) => {
        return {active: false, state: {content: `${x}, ${y}`, x, y}};
      });
    });

    this.players = this.players.map((player, i) => {
      player.ind = i;
      player.icon = this.symbols[i];
      return player;
    });

    this.route.params
      .switchMap((params: Params) => {
      this.gameId = params['id'];
        return this.fire.database.object('/games/' + this.gameId);
      })
      .subscribe(game => {
        if (!game.grid) {
          this.initGame(this.gameId);
        }
        return this.game = game;
      });
  }
  initGame(id) {
    let ob = this.fire.database.object('/games/' + this.gameId);
    ob.update({grid: this.grid, players: this.players, currentPlayer: this.players[0], victor:''});
  }

  update(game) {
    let ob = this.fire.database.object('/games/' + this.gameId);
    ob.update(game);
  }
  declareVictory(winner) {
    let ob = this.fire.database.object('/games/' + this.gameId);
    ob.update({victor: winner});
  }

  switchPlayer(idx) {
    console.log('switch: ', this.players, idx);
    if (idx === 0) {
      this.game.currentPlayer = this.players[1];
    } else {
      this.game.currentPlayer = this.players[0];
    }
    console.log('switch: ', this.players, idx, this.currentPlayer);
  }

  onClick(state) {
    if (!this.currentPlayer) {
      this.currentPlayer = this.players[0];
    }
    this.game.grid[state.y][state.x].state.content = this.game.currentPlayer.icon;
    this.game.grid[state.y][state.x].active = true;
    this.switchPlayer(this.game.currentPlayer.ind);
    this.update(this.game);
    this.victor = this.checkGameState();
    if (this.victor) {
      this.declareVictory(this.victor);
    }
  }

  checkGameState() {
    //across
    const acrossX = this.game.grid.some(column => column.every(cell => cell.state.content === this.symbols[0])) ? this.symbols[0] : false;
    const acrossY = this.game.grid.some(column => column.every(cell => cell.state.content === this.symbols[1])) ? this.symbols[1] : false;
    //down
    const down0 = (
      this.game.grid[0][0].state.content === this.game.grid[1][0].state.content &&
      this.game.grid[0][0].state.content === this.game.grid[2][0].state.content
    ) ? this.game.grid[0][0].state.content : false;

    const down1 = (
      this.game.grid[0][1].state.content === this.game.grid[1][1].state.content &&
      this.game.grid[0][1].state.content === this.game.grid[2][1].state.content
    ) ? this.game.grid[0][1].state.content : false;

    const down2 = (
      this.game.grid[0][2].state.content === this.game.grid[1][2].state.content &&
      this.game.grid[0][2].state.content === this.game.grid[2][2].state.content
    ) ? this.game.grid[0][2].state.content : false;

    const diagonal1 = (
      this.game.grid[0][0].state.content === this.game.grid[1][1].state.content &&
      this.game.grid[0][0].state.content === this.game.grid[2][2].state.content
    ) ? this.game.grid[0][0].state.content : false;

    const diagonal2 = (
      this.game.grid[0][2].state.content === this.game.grid[1][1].state.content &&
      this.game.grid[0][2].state.content === this.game.grid[2][0].state.content
    ) ? this.game.grid[0][2].state.content : false;

    const check = [acrossX, acrossY, down0, down1, down2, diagonal1, diagonal2];

    return check.find(x => x);
  }

}
