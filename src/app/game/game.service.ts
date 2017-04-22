import { Injectable } from '@angular/core';

import 'firebase';

@Injectable()
export class GameService {

  constructor() { }

  newGame = () => firebase.database().ref('games/').push({name: new Date().getUTCMilliseconds()}).key;

  getGameId = () => firebase.database().ref('games/').limitToLast(1);

}
