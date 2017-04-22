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
    this.players = this.players.map((player, i) => {
      player.ind = i;
      player.icon = this.symbols[i];
      return player;
    });
    if (!this.currentPlayer) {
      this.currentPlayer = this.players[0];
    }
    this.grid = [
      [
        {active: true, state: {content: '0, 0', x: 0, y: 0}},
        {active: false, state: {content: '0, 1', x: 1, y: 0}},
        {active: false, state: {content: '0, 2', x: 2, y: 0}},
      ],
      [
        {active: true, state: {content: '1, 0', x: 0, y: 1}},
        {active: false, state: {content: '1, 1', x: 1, y: 1}},
        {active: false, state: {content: '1, 2', x: 2, y: 1}},
      ],
      [
        {active: true, state: {content: '2, 0', x: 0, y: 2}},
        {active: false, state: {content: '2, 1', x: 1, y: 2}},
        {active: false, state: {content: '2, 2', x: 2, y: 2}},
      ]
    ];
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
    this.switchPlayer(this.currentPlayer.ind);
  }

}
