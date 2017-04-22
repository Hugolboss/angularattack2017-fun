import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'fun-battleship',
  templateUrl: './battleship.component.html',
  styleUrls: ['./battleship.component.less']
})
export class BattleshipComponent implements OnInit {
  gameId;
  grid;
  symbols = ['x', 'o'];
  players = [
    {id: 123435, name: 'player1', icon: '', ind: -1},
    {id: 678998, name: 'player2', icon: '', ind: -1}
  ];
  currentPlayer;
  constructor(private route: ActivatedRoute) { }

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
    this.route.params
      .subscribe((params: Params) => { this.gameId = params['id']; });
  }

}
