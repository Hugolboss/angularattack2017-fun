import { Injectable } from '@angular/core';
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";

import { Player } from './player';

@Injectable()
export class GameService {

  constructor(private af: AngularFire) { }

  newGame = (game, player) => {
    //push a new game to collection, add creator
    return this.af.database.list('/games/').push({
      'game': game,
      'players': [ new Player(player, 0) ]
    //return key as route param
    }).key;    
  }
  
  joinGame = (key, player) => {
    //get game to be joined
    const joining = this.af.database.object('/games/' + key);
    joining.subscribe(snapshot => {
      const p = [snapshot.players];
      //push another player to the game
      const players = p.map(i => i).push(new Player(player, p.length))
      joining.update({'players': players});
    });
  }
}
