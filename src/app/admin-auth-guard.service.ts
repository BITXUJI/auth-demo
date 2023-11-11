import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export function AdminAuthGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  const myService = inject(AuthService);
  const myRouter = inject(Router);

  if (myService.isLoggedIn()) {
    if (myService.currentUser.admin)
      return true;

    myRouter.navigate(['/no-access']);
    return false;
  }
  return false;
};
