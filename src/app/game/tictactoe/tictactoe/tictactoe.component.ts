///<reference path="../../../user.ts"/>
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {AuthService} from '../../../auth.service';
import {User} from './../../../user';

@Component({
  selector: 'fun-tictactoe',
  templateUrl: './tictactoe.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tictactoe.component.less']
})
export class TictactoeComponent implements OnInit {
  gameId;
  me;
  grid;
  game;
  symbols = ['x', 'o'];
  currentPlayer;
  victor;

  constructor(private route: ActivatedRoute, private fire: AngularFire, private authService: AuthService) {
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
    this.grid = Array(3).fill(0).map((column, x) => {
      return Array(3).fill(0).map((row, y) => {
        return {row: x % 2 === 0 ? 'even' : 'odd', active: false, state: {content: '', x, y}};
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
        return this.game;
      });
  }

  initGame(id) {
    const ob = this.fire.database.object('/games/' + this.gameId);
    this.game.players = this.game.players.map((play, i) => {
      play.icon = this.symbols[i];
      return play;
    });
    ob.update({grid: this.grid, currentPlayer: this.game.players[0], victor: '', players: this.game.players});
  }

  update() {
    const ob = this.fire.database.object('/games/' + this.gameId);
    ob.update({grid: this.game.grid, currentPlayer: this.game.currentPlayer});
  }

  declareVictory(winner) {
    // TODO tie
    // Not sure if I implemented these calls right
    // Made a small change - See line 121 - easy to reverse
    const ob = this.fire.database.object('/games/' + this.gameId);
    ob.update({victor: winner});

    const w = this.fire.database.object('/players/'+ winner.uid);
    w.first().subscribe(snapshot => {
      // TODO once user model updated
      // w.update(this.updateStats(snapshot, wins));
    })

    // there are 2 losers in the losers array, one has a symbol and one doesnt.
    // I am querying with the [0]th index for no special reason (they both have the same uid)
    const loser = this.game.players.filter(p => p !== winner)[0];
    const l = this.fire.database.object('/players/' + loser.uid);
    l.first().subscribe(snapshot => {
      // TODO once user model updated
      // l.update(this.updateStats(snapshot, losses));
    })
  }
  //Update wins, losses or ties
  updateStats(snapshot, result) {
    const n = Object.assign({}, snapshot)
    n.gameStats['tictactoe'][result] += 1;
    return {gameStats: n.gameStats}
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
    if (curr.uid !== this.me.uid) {
      return;
    }
    this.game.grid[state.y][state.x].state.content = this.game.currentPlayer.icon;
    this.game.grid[state.y][state.x].active = true;

    this.switchPlayer(this.game.players.findIndex((elm, i) => elm.uid === curr.uid));
    this.update();
    this.victor = this.checkGameState();
    if (this.victor) {
      // changed from this.winner to pass entire user to declareVictory
      // changed binding in html from game.victor to victor
      this.declareVictory(this.game.currentPlayer);
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
