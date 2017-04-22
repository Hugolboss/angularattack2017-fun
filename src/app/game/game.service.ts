import { Injectable } from '@angular/core';
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";

import { User } from './../user';

@Injectable()
export class GameService {

  constructor(private af: AngularFire) { }

  newGame = (game, player: User) => {
    // push a new game to collection, add creator
    return this.af.database.list('/games/').push({
      'game': game,
      'players': [ Object.assign({}, player, {ind:0}) ]
    // return key as route param
    }).key;
  }

  joinGame = (key, player) => {
    // get game to be joined
    const joining = this.af.database.object('/games/' + key);
    joining.subscribe(game => {
        if (game.players.length <= 1 ) {
          game.players.push(Object.assign({}, player, {ind:1}));
        }
      joining.update({'players': game.players});
    });
  }
}
