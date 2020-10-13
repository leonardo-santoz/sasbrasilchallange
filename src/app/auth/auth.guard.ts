import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  Promise<boolean> {
    if(this.authService.userIsAuthenticated())
      return true;
    
    this.router.navigate(['/acesso'])
    
    return false;
  }

}
