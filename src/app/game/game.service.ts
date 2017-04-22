import { Injectable } from '@angular/core';

import 'firebase';

@Injectable()
export class GameService {

  constructor() { }

  newGame = (game, player) => {
    return firebase.database().ref('games/').push({
      'game': game,
      'players': [ {displayName: player.displayName, id: player.uid, ind: 0} ]
    }).key;
  }
  joinGame = (key, player) => {
    firebase.database().ref('games/' + key)  
        .once('value')
        .then(snapshot => [snapshot.val().players[0], {displayName: player.displayName, id: player.uid, ind: 1}])
        .then(players => {
          firebase.database().ref('games/' + key).update({'players': players});
        })
        .catch(err => console.log('something happened:', err));
  }
}

//todo subscribe to current game to get its players, 