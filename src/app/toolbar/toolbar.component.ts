import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'fun-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less']
})
export class ToolbarComponent implements OnInit {

  login;
  logout;
  user;
  
  isAuthenticated: Observable<boolean>;

  constructor(private service: AuthService) {
    this.logout = this.service.logout;
    this.login = this.service.login;

    this.user = this.service.getUser();
    
    this.isAuthenticated = this.service.getAuthenticationStatus();
  }

  ngOnInit() {
  }
}
