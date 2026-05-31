import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const visitorGuard: CanActivateFn = (route, state) => {

  const platformId = inject(PLATFORM_ID);
  const router     = inject(Router);

  if (isPlatformBrowser(platformId)) {
    // If already logged in → redirect to home, block access to login/register/forget-password
    if (localStorage.getItem('freshToken') !== null) {
      return router.parseUrl('/'); // ✅ return the URL tree (was missing before)
    }
    return true;
  }

  // SSR: allow access (no localStorage on server)
  return true;
};
