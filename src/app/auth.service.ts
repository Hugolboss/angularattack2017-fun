import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import 'firebase';

@Injectable()
export class AuthService {

  private isAuthenticated: boolean = false;
  _user;

  constructor(private router: Router) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        this._user = user;
        console.log('user logged in');
      } else {
        this._user = null;
        this.isAuthenticated = false;
        this.router.navigate(['/home']);
        console.log('user logged out');
      }
    });
    
  }

  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  logout = () => {
    firebase.auth().signOut().then(() => {
      this.isAuthenticated = false;
      this.router.navigate(['/home']);
      this._user = null;
      console.log('logging out');
    }).catch(error => {
      console.log(error);
    });
  }

  getAuthenticationStatus() : Observable<any> {
    return Observable.of(this.isAuthenticated);
  }

  getUser() : Observable<any> {
    return Observable.of(this._user);
  }

}
