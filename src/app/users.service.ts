import { Injectable } from '@angular/core';

import 'firebase';

@Injectable()
export class UsersService {
  public users = [];

  constructor() { }

  getUsersRef(cb) {
    const usersRef = firebase.database().ref('users/');
    usersRef.on('child_added', (snapshot) => {
      console.log(snapshot.val());
      this.setUsers(snapshot.val());
      cb(this.getUsers());
    });
    return this.users;
  }

  setUsers(val) {
    this.users.push(val);
  }

  getUsers() {
    return this.users;
  }

}
