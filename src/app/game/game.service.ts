import { Injectable } from '@angular/core';

import 'firebase';

@Injectable()
export class GameService {

  constructor() { }

  newGame = (game, player) => firebase.database().ref('games/').push({
    'game': game,
    'players': [ player.displayName ]
  }).key;
}
