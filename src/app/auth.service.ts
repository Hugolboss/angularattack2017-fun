import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';


@Injectable()
export class AuthService {

  private isAuthenticated: boolean;
  isAuthSubject = new Subject<boolean>();
  _user;
  userObservable: FirebaseObjectObservable<any>;

  constructor(private router: Router, private af: AngularFire) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this._user = auth;
      }
    });
  }

  login = () => {
    this.af.auth.login();
  }

  logout = () => {
    this.af.auth.logout().then(() => {
      this.router.navigate(['']);
      this._user = null;
      console.log('logging out');
    }).catch(error => {
      console.log(error);
    });
  }

  getAuthObservable(): Observable<any> {
    return this.af.auth;
  }

}
