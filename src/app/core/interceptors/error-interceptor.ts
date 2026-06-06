import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const toastr = inject(ToastrService);
  const platformId = inject(PLATFORM_ID);
  if(isPlatformBrowser(platformId)) {
    {
      return next(req).pipe(catchError((err)=>{
        //  show error 
    
        toastr.error(err.error.message,'FreshCart',{
          progressBar : true,
          closeButton : true
        });
        return throwError(()=> err)
      }))
    }
  }
  return next(req).pipe(catchError((err)=>{
    return throwError(()=> err)
  }))
};
