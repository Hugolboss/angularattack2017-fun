import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
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
export class FindComponent implements OnInit {
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
    console.log(player);
    let config = new MdDialogConfig();

    Object.assign(config, {height: '300px', width:'600px'});

    let dialogRef:MdDialogRef<StatisticsComponent> = this.dialog.open(StatisticsComponent, config);

    dialogRef.componentInstance.player = player;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
