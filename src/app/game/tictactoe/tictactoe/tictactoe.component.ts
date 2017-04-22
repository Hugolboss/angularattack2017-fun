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
    {id: 123435, name: 'player1', icon: ''},
    {id: 678998, name: 'player2', icon: ''}
  ];
  lastPlayer;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.players = this.players.map((player, i) => { player.icon = this.symbols[i];
      return player;
    });
    this.grid = Array(Array(3), Array(3), Array(3)).map(row => {
      return row.fill({active: false, state: {content: '' }});
    });
    console.log(this.players, this.grid);
    this.route.params
      .subscribe((params: Params) => { this.gameId = params['id']; });
  }

  switchPlayer() {
    if (this.currentContent === 'X') {
      this.currentContent = 'O';
    } else {
      this.currentContent = 'X';
    }
  }

  onClick(state) {
    this.grid[state.y][state.x].state.content = this.currentContent;
    this.switchPlayer();
  }

}
