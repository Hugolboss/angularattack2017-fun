import { Injectable } from '@angular/core';

import 'firebase';

@Injectable()
export class GameService {

  constructor() { }

  newGame = (game, player) => {
    console.log(game, player);
    return firebase.database().ref('games/').push({
    'game': game,
    'players': [{displayName: player.displayName, id: player.uid, ind: 0}]
  }).key;}
}
