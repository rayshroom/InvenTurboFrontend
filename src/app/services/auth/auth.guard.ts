import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router
  ) {}

  // Uses firebase.auth().currentUser to get user logged-in status
  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser().then(
        user => {
          this.router.navigate(['/']);
          return resolve(false);
        },
        err => {
          return resolve(true);
        }
      );
    });
  }
}
