import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";

import _ from 'lodash';

@Component({
  selector: 'fun-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.less']
})
export class LeaderboardComponent implements OnInit, OnChanges {
  @Input() game: string;

  usersObservable: FirebaseListObservable<any[]>;

  leaders;
  users;

  constructor(private af: AngularFire) {
    this.usersObservable = af.database.list('/users/', {query: {
    }});

    this.usersObservable.subscribe(users => {
      console.log(users);
      this.users = users;
      this.sortUsers();
    });
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.sortUsers();
  }

  sortUsers() {
    const sortBy = this.game || 'othello';
    this.users = _.sortBy(this.users, user => {
      return user.records[sortBy].w;
    }).reverse();

    this.leaders = this.users.slice(0, 10);
    console.log(this.leaders);

  }



}
