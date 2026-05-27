import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient)

  signIn(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
  }

  signUp(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
  }

  forgetPassword(email:string):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,{
      "email":email
    })
  }

  verifyResetCode(resetCode:string):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,{
      "resetCode":resetCode
    })
  }

  updateLoggedUserPassword(data:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/users/changeMyPassword`,data)
  }

  resetPassword(data:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
  }

  updateLoggedUserData(data:object):Observable<any>
  {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/users/updateMe/`,data)
  }

  verifyToken():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/auth/verifyToken`)
  }
}
