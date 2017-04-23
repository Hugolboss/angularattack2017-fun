///<reference path="../../../user.ts"/>
import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {AuthService} from '../../../auth.service';
import {User} from './../../../user';
import {UsersService} from '../../../users.service';

@Component({
  selector: 'fun-tictactoe',
  templateUrl: './tictactoe.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tictactoe.component.less']
})
export class TictactoeComponent implements OnInit, OnDestroy {
  gameId;
  images = {x: '../../../../../assets/x.png', o: '../../../../../assets/o.png'};
  me;
  grid;
  game;
  symbols = ['x', 'o'];
  currentPlayer;
  victor;
  players;


  constructor(private route: ActivatedRoute, private fire: AngularFire, private authService: AuthService, private userService: UsersService) {
    this.authService.getAuthObservable().subscribe(auth => {
      this.me = new User({
        email: auth.auth.email,
        profile_picture: auth.auth.profile_picture,
        uid: auth.auth.uid,
        username: auth.auth.displayName

      });
    });
  }

  ngOnInit() {
    this.grid = Array(3).fill(0).map((column, y) => {
      return Array(3).fill(0).map((row, x) => {
        return {row: y % 2 === 0 ? 'even' : 'odd', active: false, state: {content: '', x, y}};
      });
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
        if (game.players.length === 2 && !game.players[0].pieceCount) {

          this.players = game.players.map((p, i) => {
            p.ind = i;
            p.icon = i === 0 ? 'x' : 'o';
            return p;
          });
          this.updatePlayers(this.players);
        }
        return this.game;
      });
  }

  updatePlayers(players) {
    const ob = this.fire.database.object('/games/' + this.gameId);
    ob.update({players: players});
  }

  initGame(id) {
    const ob = this.fire.database.object('/games/' + this.gameId);
    this.game.players = this.game.players.map((play, i) => {
      play.icon = this.symbols[i];
      return play;
    });
    ob.update({grid: this.grid, currentPlayer: this.game.players[0], victor: '', players: this.game.players, count: 1});
  }

  update() {
    const ob = this.fire.database.object('/games/' + this.gameId);
    const count = this.game.count = this.game.count + 1;
    ob.update({grid: this.game.grid, currentPlayer: this.game.currentPlayer, count: count});
  }

  declareVictory(winner, loser) {
    let victor;
    const ob = this.fire.database.object('/games/' + this.gameId);
    if (!winner) {
      victor = {draw: true};
    } else {
      victor = {winner: winner, loser: loser};
    }
    this.game.state = 'completed';
    ob.update({grid: this.game.grid, currentPlayer: this.game.currentPlayer, victor: victor, state: 'completed'});
    this.updateUsers(winner, this.game.game, this.game.players);
  }

  updateUsers(winner, type, players) {
    let g = {};
    const users = players.map((p) => {
      if (winner.draw) {
        p.record['tictactoe']['d']++;
      }
      if (winner && winner.uid === p.uid) {
        p.record['tictactoe']['w']++;
      } else if (!winner.draw) {
        p.record['tictactoe']['l']++;
      }
      return p;
    });
    users.forEach(u => this.userService.updateUser(u));
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
    const curr = this.game.currentPlayer;
    if (curr.uid !== this.me.uid || this.game.state === 'pending' || this.game.state === 'completed') {
      return;
    }
    this.game.grid[state.y][state.x].state.content = this.game.currentPlayer.icon;
    this.game.grid[state.y][state.x].active = true;

    this.switchPlayer(this.game.players.findIndex((elm, i) => elm.uid === curr.uid));
    this.victor = this.checkGameState();

    if (this.victor || this.game.count === 9) {
      const v = (this.victor) ? curr : null;
      return this.declareVictory(v, this.game.currentPlayer);
    }
    return this.update();

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

  ngOnDestroy() {
    if (!this.game.victor.winner) {
      this.game.state = 'abandoned';
      const ob = this.fire.database.object('/games/' + this.gameId);
      ob.update({state: 'abandoned'});
    }
  }
}
