import {Component} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'fun-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'fun works!';
  login = this.authService.login;
  logout = this.authService.logout;

  constructor(private authService: AuthService) {
  }

}
