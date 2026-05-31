import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient)
  private readonly router = inject(Router)
  isLogged = signal<boolean>(false)
  userData  = signal<{ name: string; email: string }>({ name: '', email: '' });
  email = signal('')

  // Decode JWT payload (base64) to extract user name & email
  // Called after login and on navbar init (page refresh)
  setUserFromToken(): void {
    const token = localStorage.getItem('freshToken');
    if (!token) return;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userData.set({
        name:  payload.name  ?? '',
        email: this.email() ,
      });
    } catch {
      this.userData.set({ name: '', email: '' });
    }
  }

  signOut():void
  {
    localStorage.removeItem('freshToken')
    this.isLogged.set(false)
    this.router.navigate(['/'])
  }

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
