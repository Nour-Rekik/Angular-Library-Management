import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router ,
              private authService: AuthService) { }

canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.userIsLogged()) {
      return true;
    } else {
    this.router.navigate(['/auth', 'signin']);
    return false;
    }
  }

}