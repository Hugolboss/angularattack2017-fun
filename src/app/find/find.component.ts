import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { MdIcon, MdIconRegistry } from '@angular/material';
import { Subject } from 'rxjs';

import { User } from './../user';
import { UsersService } from './../users.service';
import { StatisticsComponent } from './../statistics/statistics.component';

import { GameService } from './../game/game.service';
import { FindService } from './find.service';

@Component({
  selector: 'fun-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.less'],
  providers: [FindService, GameService]
})
export class FindComponent implements OnInit, OnChanges {
  @Input() game: string;
  @Input() user;
  games;
  private unsubscribe: Subject<void> = new Subject<void>();
  constructor(
    private usersService: UsersService,
    private findService: FindService,
    private router: Router,
    private gameService: GameService,
    public dialog: MdDialog
  ) { }

  ngOnInit() {}

  ngOnChanges() {
    // this.games = this.findService.findGames(this.game);
    this.findService.findGames(this.game)
      .takeUntil(this.unsubscribe)
      .subscribe(games => this.games = games);
  }

  joinAvailableGame(key, game) {
    this.gameService.joinGame(key, this.user);
    this.router.navigate(['/' + this.uglyName(game) + '/' + key]);
  }

  private uglyName(name) {
    return {
      'Tic Tac Toe': 'tictactoe',
      'Checkers': 'checkers',
      'Othello': 'othello'
    }[name];
  }

  viewPlayer(player: User) : void {
    let config = new MdDialogConfig();
    Object.assign(config, {height: '250px', width:'600px'});
    this.usersService.getUser(player.uid)
    .first()
    .subscribe(p => {
      let dialogRef:MdDialogRef<StatisticsComponent> = this.dialog.open(StatisticsComponent, config);
      dialogRef.componentInstance.player = p;
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
