import { Injectable } from '@angular/core';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';

@Injectable()
export class StatisticsService {

  gameStatsObservable: FirebaseObjectObservable<any>;

  constructor(private af: AngularFire) { }

  getGameStatistics() {
    return this.gameStatsObservable = this.af.database.object('/gameStats/');
  }
}
