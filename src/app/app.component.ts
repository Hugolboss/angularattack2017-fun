import {Component} from '@angular/core';
import {AuthService} from './auth.service';
import {UsersService} from './users.service';

@Component({
  selector: 'fun-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'fun works!';
  login = this.authService.login;
  logout = this.authService.logout;
  users = [];

  constructor(private authService: AuthService, private usersService: UsersService) {
    this.usersService.getUsersRef((userList) => { this.users = userList; });
  }

}
