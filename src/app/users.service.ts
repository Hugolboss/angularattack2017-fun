import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Http } from '@angular/http';
import {User} from './user';


@Injectable()
export class UsersService {
  public users = [];
  userObservable: FirebaseObjectObservable<any>;
  private usersApiUrl = '';

  constructor(private af: AngularFire, private http: Http) { }

  getUser(id) {
    return this.userObservable = this.af.database.object('/users/' + id);
  }

  updateUser(user) {
    // this.af.database.object('/users/' + (user.uid || user.$key)).update(user);
    console.log(user);
    this.http.post(this.usersApiUrl, {})
  }

  handleError() {

  }
}
