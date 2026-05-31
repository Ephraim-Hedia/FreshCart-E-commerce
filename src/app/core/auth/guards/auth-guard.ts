import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  // gaurd for orders checkout wishlist cart pages 
  const pLATFORM_ID = inject(PLATFORM_ID)
  const router = inject(Router)
  if(isPlatformBrowser(pLATFORM_ID))
  {
    if(localStorage.getItem('freshToken'))
    {
      return true;
    }else{
      return router.parseUrl('/login');
    }
  }
  else{
    // very important note to make it as true for the server 
    return true;
  }

};
