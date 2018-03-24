import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (document.cookie.length>0) {
          this.router.navigate(['/main'], { queryParams: { returnUrl: state.url }});
          return false;
        }
        return true
    }
}
