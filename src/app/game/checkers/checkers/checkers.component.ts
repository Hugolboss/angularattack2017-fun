import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CheckersService} from '../checkers.service';
import {AuthService} from '../../../auth.service';
import {User} from '../../../user';

@Component({
  selector: 'fun-checkers',
  templateUrl: './checkers.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./checkers.component.less']
})
export class CheckersComponent implements OnInit {
  gameId;
  me;
  lastClick;
  potentialMoves;
  images = {red: '../../../../../assets/red-piece.png', black: '../../../../../assets/black-piece.png'};

  constructor(private route: ActivatedRoute, public checkersService: CheckersService, private authService: AuthService) {
    this.authService.getAuthObservable().subscribe(auth => {
      this.me = new User({
        email: auth.auth.email,
        profile_picture: auth.auth.profile_picture,
        uid: auth.auth.uid,
        username: auth.auth.displayName,
      });
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.checkersService.setGame(this.gameId);
    });
  }

  onClick($state) {
    const currentp = this.checkersService.game.currentPlayer;
    if (currentp.uid !== this.me.uid) {
      return;
    }
    if (this.checkValidPiece($state.content, this.checkersService.game.currentPlayer.icon) && !this.lastClick) {
      const direction = ($state.content === 'black') ? 1 : -1;
      const moves = [
        {x: $state.x + direction, y: $state.y - 1, valid: this.checkLocationEmpty($state.x + direction, $state.y - 1)},
        {x: $state.x + direction, y: $state.y + 1, valid: this.checkLocationEmpty($state.x + direction, $state.y + 1)}
      ];
      this.setPotentialMoves(moves, $state);
    } else if (this.lastClick) {
      if ($state.x === this.lastClick.x && $state.y === this.lastClick.y) {
        this.resetTurn();
      }
      if ($state.available) {
        this.movePiece($state, this.lastClick, this.potentialMoves);
      }
    }
  }
  setPotentialMoves(moves, $state) {
    this.checkForOpponentPosition(this.checkersService.game.currentPlayer.opponentColor, $state, moves);
    if (moves.filter(m => m.valid).length !== 0) {
      this.setAvailable(moves);
      this.lastClick = {x: $state.x, y: $state.y, content: $state.content};
      this.potentialMoves = moves.filter(m => m.valid);
    }
  }

  checkForOpponentPosition(opc, state, moves) {
    let gr =  this.checkersService.game.grid;
    let opArr = [{x: state.x + 1, y: state.y + 1},
      {x: state.x + 1, y: state.y - 1},
      {x: state.x - 1, y: state.y + 1},
      {x: state.x - 1, y: state.y - 1}
    ].forEach(row => {
      if (gr[row.x] && gr[row.x][row.y] && gr[row.x][row.y].state.content === opc) {
        let pos = [row.x, row.y];
        if (pos[0] > state.x && pos[1] > state.y && this.checkLocationEmpty(pos[0] + 1, pos[1] + 1)) {
          moves.push({valid: true, opX: pos[0], opY: pos[1], x: pos[0] + 1, y: pos[1] + 1, opc: opc});
        }
        if (pos[0] > state.x && pos[1] < state.y && this.checkLocationEmpty(pos[0] + 1, pos[1] - 1)) {
          moves.push({valid: true, opX: pos[0], opY: pos[1], x: pos[0] + 1, y: pos[1] - 1, opc: opc});
        }
        if (pos[0] < state.x && pos[1] < state.y && this.checkLocationEmpty(pos[0] - 1, pos[1] - 1)) {
          moves.push({valid: true, opX: pos[0], opY: pos[1], x: pos[0] - 1, y: pos[1] - 1, opc: opc});
        }
        if (pos[0] < state.x && pos[1] > state.y && this.checkLocationEmpty(pos[0] - 1, pos[1] + 1)) {
          moves.push({valid: true, opX: pos[0], opY: pos[1], x: pos[0] - 1, y: pos[1] + 1, opc: opc});
        }
      }
    });
  }

  switchPlayer(idx) {
    if (idx === 0) {
      this.checkersService.game.currentPlayer = this.checkersService.game.players[1];
    } else {
      this.checkersService.game.currentPlayer = this.checkersService.game.players[0];
    }
    this.checkersService.updateCurrentPlayer(this.checkersService.game.currentPlayer);
  }

  movePiece(to, from, potentialMoves) {
    let players = this.checkersService.game.players;
    let victor = false;
    let dontReset = false;
    const jumped = potentialMoves.find(elm => to.x === elm.x);
    if (to) {
      this.checkersService.game.grid[to.x][to.y].state.content = from.content;
    }
    if (from) {
      this.checkersService.game.grid[from.x][from.y].state.content = ``;
    }
    if (jumped && jumped.opX) {
      this.checkersService.game.grid[jumped.opX][jumped.opY].state.content = ``;
      players = this.losePiece(jumped.opc);
      potentialMoves = [];
      this.checkForOpponentPosition(jumped.opc, to, potentialMoves);
      if ( potentialMoves.length !== 0) {
        this.clearAvailable(this.potentialMoves);
        this.setPotentialMoves(potentialMoves, to);
        dontReset = true;
      }
    }
    victor = this.checkForWinner();
    this.checkersService.updateFull(this.checkersService.game.grid, players, victor);
    if(!dontReset) {
      this.resetTurn();
      this.updateCurrentUser();
    }
  }

  checkForWinner() {
    return this.checkersService.game.players.filter(p => p.pieceCount !== 0).length <=1;

  }

  losePiece(color) {
    const players = this.checkersService.players.map(p => {
      if (p.icon === color) {
        p.pieceCount--;
      }
      return p;
    });
    return players;
  }

  updateCurrentUser() {
    this.switchPlayer(this.checkersService.game.currentPlayer.ind);
  }

  resetTurn() {
    this.clearAvailable(this.potentialMoves);
    this.potentialMoves = [];
    this.lastClick = null;
  }

  setAvailable(moves) {
    moves.forEach(move => {
      if (move.valid) {
        this.checkersService.game.grid[move.x][move.y].state.available = true;
      }
    });
  }

  clearAvailable(moves) {
    moves.forEach(move => {
      if (this.checkersService.game.grid[move.x][move.y]) {
        this.checkersService.game.grid[move.x][move.y].state.available = false;
      }
    });
    this.checkersService.update(this.checkersService.game.grid);
  }

  checkValidPiece(val, color) {
    if (color) {
      return val === color;
    }
    return (val === 'red' || val === 'black');
  }

  checkLocationEmpty(x, y) {
    let valid = false;
    if (this.checkersService.game.grid[x] && this.checkersService.game.grid[x][y]) {
      valid = !this.checkValidPiece(this.checkersService.game.grid[x][y].state.content, null);
    }

    return valid;
  }

}
