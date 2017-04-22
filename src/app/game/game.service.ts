import { Injectable } from '@angular/core';
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";
// import 'rxjs/add/operators/mergeMap';


@Injectable()
export class GameService {

  constructor(private af: AngularFire) { }

  newGame = (game, player) => {
    console.log(game, player);
    return this.af.database.list('/games/').push({
      'game': game,
      'players': [ {displayName: player.displayName, id: player.uid, ind: 0} ]
    }).key;
  }

  joinGame = (key, player) => {
    const joining = this.af.database.object('/games/' + key);
    joining.subscribe(snapshot => {
      const players = [snapshot.players[0], {displayName: player.displayName, id: player.uid, ind: 1}];
      joining.update({'players': players});
    });
  }
}

//todo subscribe to current game to get its players,
