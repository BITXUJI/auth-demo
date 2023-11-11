import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

export function AuthGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
  const myService = inject(AuthService);
  const myRouter = inject(Router);
  if (myService.isLoggedIn()) {
    return true;
  }
  myRouter.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
}