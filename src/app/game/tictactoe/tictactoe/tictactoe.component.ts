import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'fun-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.less']
})
export class TictactoeComponent implements OnInit {
  gameId;
  grid;
  symbols = ['x', 'o'];
  players = [
    {id: 123435, name: 'player1', icon: '', ind: -1},
    {id: 678998, name: 'player2', icon: '', ind: -1}
  ];
  currentPlayer;
  constructor(private route: ActivatedRoute) {}

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
    if (!this.currentPlayer) {
      this.currentPlayer = this.players[0];
    }
    this.route.params
      .subscribe((params: Params) => { this.gameId = params['id']; });
  }

  switchPlayer(idx) {
    if (idx === 0) {
      this.currentPlayer = this.players[1];
    }else {
      this.currentPlayer = this.players[0];
    }
  }

  onClick(state) {
    this.grid[state.y][state.x].state.content = this.currentPlayer.icon;
    this.grid[state.y][state.x].active = true;
    this.switchPlayer(this.currentPlayer.ind);

    console.log(this.checkGameState());
  }

  checkGameState() {
    //across
    const acrossX = this.grid.some(column => column.every(cell => cell.state.content === 'X')) ? 'X' : false;
    const acrossY = this.grid.some(column => column.every(cell => cell.state.content === 'Y')) ? 'Y' : false;
    //down
    const down0 = (
      this.grid[0][0].state.content === this.grid[1][0].state.content &&
      this.grid[0][0].state.content === this.grid[2][0].state.content
    ) ? this.grid[0][0].state.content : false;

    const down1 = (
      this.grid[0][1].state.content === this.grid[1][1].state.content &&
      this.grid[0][1].state.content === this.grid[2][1].state.content
    ) ? this.grid[0][1].state.content : false;

    const down2 = (
      this.grid[0][2].state.content === this.grid[1][2].state.content &&
      this.grid[0][2].state.content === this.grid[2][2].state.content
    ) ? this.grid[0][2].state.content : false;

    const diagonal1 = (
      this.grid[0][0].state.content === this.grid[1][1].state.content &&
      this.grid[0][0].state.content === this.grid[2][2].state.content
    ) ? this.grid[0][0].state.content : false;

    const diagonal2 = (
      this.grid[0][2].state.content === this.grid[1][1].state.content &&
      this.grid[0][2].state.content === this.grid[2][0].state.content
    ) ? this.grid[0][2].state.content : false;

    const check = [acrossX, acrossY, down0, down1, down2, diagonal1, diagonal2];

    return check.find(x => x);
  }

}
