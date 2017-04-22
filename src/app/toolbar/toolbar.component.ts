import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";

import { User } from '../user';

@Component({
  selector: 'fun-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less']
})
export class ToolbarComponent implements OnInit {

  login;
  logout;
  user: User;

  isAuthenticated;

  constructor(private authService: AuthService, private router: Router) {
    this.logout = this.authService.logout;
    this.login = this.authService.login;

    this.authService.getAuthObservable().subscribe(auth => {
      if (auth) {
        this.isAuthenticated = true;
        const u = {
          username: auth.auth.displayName,
          uid: auth.uid,
          profile_picture: auth.auth.photoURL,
          email: auth.auth.email
        };
        this.user = new User(u);
      } else {
        this.user = new User();
      }
    });
  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['']);
  }
}
