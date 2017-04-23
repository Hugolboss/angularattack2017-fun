import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthService} from "../../../auth.service";
import {User} from "../../../user";
import {OthelloService} from "../othello.service";
import _ from 'lodash';

const XImage = 'http://www.clipartkid.com/images/19/black-circle-clip-art-png-and-svg-GmosNX-clipart.png';
const OImage = 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg';


@Component({
  selector: 'fun-othello',
  templateUrl: './othello.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./othello.component.less']
})
export class OthelloComponent implements OnInit {
  gameId;
  me;
  grid;
  game;
  players;
  currentPlayer;
  images;
  victor;

  constructor(private route: ActivatedRoute, public othelloService: OthelloService, private authService: AuthService, private router: Router) {
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
    this.route.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.othelloService.setGame(this.gameId);
    });
    this.images = {
      X: XImage,
      O: OImage
    }
  }

  onClick({x, y}) {
    let curr = this.othelloService.game.currentPlayer;
    if (curr.uid !== this.me.uid) {
      return;
    }
    const cell = this.othelloService.game.grid[y][x];
    if (cell.active || !cell.moveDifferential || !cell.moveDifferential.length) {
      return;
    }

    cell.state.player = this.othelloService.game.currentPlayer;
    cell.state.content = this.othelloService.game.currentPlayer.icon;
    cell.active = true;

    cell.moveDifferential.forEach(diff => {
      const cellToSwitch = this.othelloService.game.grid[diff.y][diff.x];
      cellToSwitch.state.player = this.othelloService.game.currentPlayer;
      cellToSwitch.state.content = this.othelloService.game.currentPlayer.icon;
    });

    const idx = this.othelloService.players.find(p => p.uid === curr.uid).ind;
    const currentUser = this.othelloService.switchPlayer(idx);
    this.othelloService.setStateDifferential();
    this.othelloService.combinedUpdate(this.othelloService.game.grid, currentUser);
    this.updateCounts();
    this.checkVictory();

    if (!this.hasMoves() && !this.othelloService.game.victor) {
      this.othelloService.skipTurn(true);
    }
  }

  private hasMoves() {
    const flattenedGrid = _.flatten(this.othelloService.game.grid);
    return flattenedGrid.some(cell => cell.moveDifferential && cell.moveDifferential.length);
  }

  private updateCounts() {
    const flattenedGrid = _.flatten(this.othelloService.game.grid);
    const p1Count = flattenedGrid.reduce((count, cell) => {
      if (cell.state.player && cell.state.player.uid === this.othelloService.players[0].uid) {
        count++;
      }
      return count;
    }, 0);

    const p2Count = flattenedGrid.reduce((count, cell) => {
      if (cell.state.player && cell.state.player.uid === this.othelloService.players[1].uid) {
        count++;
      }
      return count;
    }, 0);

    this.othelloService.players[0].pieceCount = p1Count;
    this.othelloService.players[1].pieceCount = p2Count;
    this.othelloService.updatePlayers(this.othelloService.players);
  }

  private checkVictory() {
    const p1Count = this.othelloService.players[0].pieceCount;
    const p2Count = this.othelloService.players[1].pieceCount;

    if (p1Count === 0 || p2Count === 0 || p1Count + p2Count === 64) {
      this.getVictor();
    }
  }

  private getVictor() {
    const p1Count = this.othelloService.players[0].pieceCount;
    const p2Count = this.othelloService.players[1].pieceCount;
    let winner;
    if (p1Count === p2Count) {
      winner = 'Tie';
    } else if (p1Count > p2Count) {
      winner = this.othelloService.players[0].username;
    } else {
      winner = this.othelloService.players[1].username;
    }
    this.othelloService.updateVictor({
      winner,
      p1Count,
      p1: this.othelloService.players[0],
      p2Count,
      p2: this.othelloService.players[1]
    });
  }

  onMouseOver(cell) {
    let curr = this.othelloService.game.currentPlayer;
    if (curr.uid !== this.me.uid) {
      return;
    }
    if (!cell.active && cell.moveDifferential && cell.moveDifferential.length) {
      cell.state.content = this.othelloService.game.currentPlayer.icon;
    }
  }

  onMouseLeave(cell) {
    if (!cell.active) {
      cell.state.content = `${cell.state.x}, ${cell.state.y}`;
    }
  }

  backToLobby() {
    this.router.navigate(['/']);
  }
}
