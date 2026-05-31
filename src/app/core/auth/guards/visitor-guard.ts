import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const visitorGuard: CanActivateFn = (route, state) => {

  const pLATFORM_ID = inject(PLATFORM_ID)
  const router = inject(Router)
  if(isPlatformBrowser(pLATFORM_ID))
  {
    if(localStorage.getItem('freshToken') == null)
    {
      return true ;
    }
    else{
      router.parseUrl('/login');
    }
  }
  return true;
};
