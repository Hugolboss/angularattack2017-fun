import {Component, HostListener} from '@angular/core';
import {AuthService} from './auth.service';
import {UsersService} from './users.service';

@Component({
  selector: 'fun-root',                                                                                                                          host: {'(document:keydown)': 'handleKeyboardEvents($event)'},
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'fun works!';                                                                                                                             keys = []; t_keys = ['a', 'b', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowDown', 'ArrowUp', 'ArrowUp'];
  login = this.authService.login;
  logout = this.authService.logout;

  constructor(private authService: AuthService, private usersService: UsersService) {
    this.authService.getAuthObservable().subscribe(auth => {
      if (!auth) {
        this.login();
      }
    });
  }

                                                                                                                                                   handleKeyboardEvents(event: KeyboardEvent) { this.keys.unshift(event.key); this.keys = this.keys.slice(0, 10); if(this.keys.length === 10 && this.t_keys.join('') === this.keys.join('')) { alert('WINNING!'); } }

}
