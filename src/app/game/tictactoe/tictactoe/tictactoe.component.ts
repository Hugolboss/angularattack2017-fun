import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {AuthService} from '../../../auth.service';

@Component({
  selector: 'fun-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.less']
})
export class TictactoeComponent implements OnInit {
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
  lastPlayerId;

  constructor(private route: ActivatedRoute, private fire: AngularFire, private authService: AuthService) {
    this.authService.getAuthObservable().subscribe(auth => {
      this.me = {
        uid: auth.google.uid,
        name: auth.google.displayName
      }
    });
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
        this.game = game;
        if (!game.grid) {
          this.initGame(this.gameId);
        }
        return this.game;
      });
  }
  initGame(id) {
    let ob = this.fire.database.object('/games/' + this.gameId);
    this.game.players = this.game.players.map((play , i) => {
      play.icon = this.symbols[i];
      return play;
    });
    ob.update({grid: this.grid, currentPlayer: this.game.players[0], victor:'', players: this.game.players, lastPlayerId: ''});
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
      this.game.currentPlayer = this.game.players[1];
    } else {
      this.game.currentPlayer = this.game.players[0];
    }
    console.log('switch: ', this.players, idx, this.currentPlayer);
  }

  onClick(state) {
    let curr = this.game.currentPlayer;
    if (curr.id !== this.me.uid){
      return;
    }
    this.game.grid[state.y][state.x].state.content = this.game.currentPlayer.icon;
    this.game.grid[state.y][state.x].active = true;

    this.switchPlayer(this.game.players.findIndex((elm, i) => elm.id === curr.id));
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
