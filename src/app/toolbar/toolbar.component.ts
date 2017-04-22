import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";

@Component({
  selector: 'fun-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less']
})
export class ToolbarComponent implements OnInit {

  login;
  logout;
  user = {};

  isAuthenticated;

  constructor(private authService: AuthService, private router: Router) {
    this.logout = this.authService.logout;
    this.login = this.authService.login;

    this.authService.getAuthObservable().subscribe(auth => {
      if (auth) {
        this.isAuthenticated = true;
        this.user = {
          name: auth.google.displayName,
          avatar: auth.google.photoURL
        };
      } else {
        this.user = {};
      }
    });
  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['home/']);
  }
}
