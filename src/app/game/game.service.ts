import { Injectable } from '@angular/core';
// import 'rxjs/add/operators/mergeMap';

import 'firebase';

@Injectable()
export class GameService {

  constructor() { }

  newGame = (game, player) => {
    console.log(game, player);
    return firebase.database().ref('games/').push({
      'game': game,
      'players': [ {displayName: player.displayName, id: player.uid, ind: 0} ]
    }).key;
  }

  joinGame = (key, player) => {
    let players = [{displayName: player.displayName, id: player.uid, ind: 1}];
    firebase.database().ref('games/' + key)
        .once('value')
        .then(function(snapshot) {
          players.unshift(snapshot.val().players);
          return players;
        })
        .then(players => {
          firebase.database().ref('games/' + key).update({'players': players});
        })
        .catch(err => console.log('something happened:', err));
  }
}

//todo subscribe to current game to get its players, 