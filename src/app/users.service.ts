import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import {User} from './user';


@Injectable()
export class UsersService {
  public users = [];
  userObservable: FirebaseObjectObservable<any>;

  constructor(private af: AngularFire) { }

  getUser(id) {
    return this.userObservable = this.af.database.object('/users/' + id);
  }

  updateUser(user) {
    this.af.database.object('/users/' + (user.uid || user.$key)).update(user);
  }

}
