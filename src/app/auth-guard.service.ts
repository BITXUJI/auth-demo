import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export function AuthGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
  const myService = inject(AuthService);
  const myRouter = inject(Router);
  if (myService.isLoggedIn()) {
    return true;
  }
  myRouter.navigate(['/login']);
  return false;
}