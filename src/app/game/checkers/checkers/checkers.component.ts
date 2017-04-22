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
    if (this.checkValidPiece($state.content)) {
      const direction = ($state.content === 'black') ? 1 : -1;
      console.log(this.checkLocationEmpty($state.x + direction, $state.y - 1), this.checkLocationEmpty($state.x + direction, $state.y + 1));
    }
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
