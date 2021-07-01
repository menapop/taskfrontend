import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './AuthService';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      if (this.authService.isLogin()) {
        resolve(true);
      } else {
        this.authService.refreshCurrentToken().then(value => {
          if (value) {
            resolve(true);
          } else {
            this.router.navigate(['/Login']);
            resolve(false);
          }
        });
      }
    });
  }
}
