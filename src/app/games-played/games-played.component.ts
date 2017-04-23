import { Component, OnInit } from '@angular/core';
import { StatisticsService } from './../statistics/statistics.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'fun-games-played',
  templateUrl: './games-played.component.html',
  styleUrls: ['./games-played.component.less']
})
export class GamesPlayedComponent implements OnInit {

  games;
  unsubscribe: Subject<void> = new Subject<void>();
  constructor(private statisticsService: StatisticsService) {
    this.statisticsService.getGameStatistics()
      .takeUntil(this.unsubscribe)
      .subscribe(games => {
        this.games = {
          started: games.started,
          completed: games.completed,
          pending: games.pending,
          abandoned: games.abandoned,
        }
    })
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
