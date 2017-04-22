import { Injectable } from '@angular/core';

import 'firebase';

@Injectable()
export class FindService {

  constructor() { }

  findGames = (game) => firebase.database().ref('games/').orderByKey().limitToFirst(20);
}
