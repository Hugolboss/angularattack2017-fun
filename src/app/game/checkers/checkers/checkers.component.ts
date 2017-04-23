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

  constructor(private route: ActivatedRoute, public checkersService: CheckersService, private authService: AuthService) {
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
      this.checkersService.setGame(this.gameId);
    });
  }

  onClick($state) {
    const currentp = this.checkersService.game.currentPlayer;
    if (currentp.uid !== this.me.uid) {
      return;
    }
    if (this.checkValidPiece($state.content, this.checkersService.game.currentPlayer.pieceColor) && !this.lastClick) {
      const direction = ($state.content === 'black') ? 1 : -1;
      const moves = [
        {x: $state.x + direction, y: $state.y - 1, valid: this.checkLocationEmpty($state.x + direction, $state.y - 1)},
        {x: $state.x + direction, y: $state.y + 1, valid: this.checkLocationEmpty($state.x + direction, $state.y + 1)}
      ];
      this.checkForOpponentPosition(this.checkersService.game.currentPlayer.opponentColor, $state, moves);
      if (moves.filter(m => m.valid).length !== 0) {
        this.setAvailable(moves);
        this.lastClick = {x: $state.x, y: $state.y, content: $state.content};
        this.potentialMoves = moves.filter(m => m.valid);
      }
    } else if (this.lastClick) {
      if ($state.x === this.lastClick.x && $state.y === this.lastClick.y) {
        this.resetTurn();
      }
      if ($state.available) {
        this.movePiece($state, this.lastClick, this.potentialMoves);
      }
    }
  }

  checkForOpponentPosition(opc, state, moves) {
    let opArr = [{x: state.x + 1, y: state.y + 1},
      {x: state.x + 1, y: state.y - 1},
      {x: state.x - 1, y: state.y + 1},
      {x: state.x - 1, y: state.y - 1}
    ].forEach(row => {
      if (this.checkersService.game.grid[row.x][row.y] && this.checkersService.game.grid[row.x][row.y].state.content === opc) {
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
    const jumped = potentialMoves.find(elm => to.x === elm.x);
    if (to) {
      this.checkersService.game.grid[to.x][to.y].state.content = from.content;
    }
    if (from) {
      this.checkersService.game.grid[from.x][from.y].state.content = ``;
    }
    if (jumped && jumped.opX) {
      this.checkersService.game.grid[jumped.opX][jumped.opY].state.content = ``;
      this.losePiece(jumped.opc);
    }
    this.checkersService.update(this.checkersService.game.grid);
    this.resetTurn();
    this.updateCurrentUser();
  }

  losePiece(color) {
    const players = this.checkersService.players.map(p => {
      if (p.pieceColor === color) {
        p.pieceCount--;
      }
      return p;
    })
   // this.checkersService.updatePlayers(players);
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
    if (this.checkersService.game.grid[x][y]) {
      valid = !this.checkValidPiece(this.checkersService.game.grid[x][y].state.content, null);
    }

    return valid;
  }

}
