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
    if (this.checkValidPiece($state.content) && !this.lastClick) {
      const direction = ($state.content === 'black') ? 1 : -1;
      const moves = [
        {x: $state.x + direction, y: $state.y - 1, valid: this.checkLocationEmpty($state.x + direction, $state.y - 1)},
        {x: $state.x + direction, y: $state.y + 1, valid: this.checkLocationEmpty($state.x + direction, $state.y + 1)}
      ];
      if (moves[0].valid || moves[1].valid) {
        this.setAvailable(moves);
        this.lastClick = {x: $state.x, y: $state.y, content: $state.content};
        this.potentialMoves = moves.filter(m => m.valid);
      }
    } else if (this.lastClick) {
      if ($state.x === this.lastClick.x && $state.y === this.lastClick.y) {
        this.resetTurn();
      }
      if ($state.available) {
        this.movePiece($state, this.lastClick);
      }
    }
  }

  movePiece(to, from) {
    if (to) {
      this.checkersService.game.grid[to.x][to.y].state.content = from.content;
    }
    if (from) {
      this.checkersService.game.grid[from.x][from.y].state.content = `${from.x}, ${from.y}`;
    }
    this.resetTurn();
    this.updateCurrentUser();
  }

  updateCurrentUser() {
    console.log('updating current user');
  }

  resetTurn() {
    this.clearAvailable(this.potentialMoves);
    this.potentialMoves = [];
    this.lastClick = null;
    this.checkersService.update();
  }

  setAvailable(moves) {
    moves.forEach(move => {
      if (move.valid) {
        this.checkersService.game.grid[move.x][move.y].state.available = true;
      }
    });
    this.checkersService.update();
  }

  clearAvailable(moves) {
    moves.forEach(move => {
      if (this.checkersService.game.grid[move.x][move.y]) {
        this.checkersService.game.grid[move.x][move.y].state.available = false;
      }
    });
  }

  checkValidPiece(val) {
    return (val === 'red' || val === 'black');
  }

  checkLocationEmpty(x, y) {
    let valid = false;
    if (this.checkersService.game.grid[x][y]) {
      valid = !this.checkValidPiece(this.checkersService.game.grid[x][y].state.content);
    }
    return valid;
  }

}
