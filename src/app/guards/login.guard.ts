import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommonService } from '../common.service';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private router: Router,
                private commonService: CommonService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if ((window.localStorage.getItem("login"))) {
          this.router.navigate(['/main'], { queryParams: { returnUrl: state.url }});
          return false;
        }
        return true
    }
}
