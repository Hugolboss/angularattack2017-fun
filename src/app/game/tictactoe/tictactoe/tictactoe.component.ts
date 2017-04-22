import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'fun-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.less']
})
export class TictactoeComponent implements OnInit {
  gameId;
  grid;
  game: FirebaseListObservable<any>;
  symbols = ['x', 'o'];
  players = [
    {id: 123435, name: 'player1', icon: '', ind: -1},
    {id: 678998, name: 'player2', icon: '', ind: -1}
  ];
  currentPlayer;
  victor;
  constructor(private route: ActivatedRoute, private fire: AngularFire) {}

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
      .subscribe((params: Params) => { this.fire.database.object('/games/' + params['id'])});
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

   this.victor = this.checkGameState();
  }

  checkGameState() {
    //across
    const acrossX = this.grid.some(column => column.every(cell => cell.state.content === this.symbols[0])) ? this.symbols[0] : false;
    const acrossY = this.grid.some(column => column.every(cell => cell.state.content === this.symbols[1])) ? this.symbols[1] : false;
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
