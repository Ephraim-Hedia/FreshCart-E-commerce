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

  // ── Auth state signals ─────────────────────────────────────────────────────
  isLogged = signal<boolean>(false);
  userData = signal<{ id: string; name: string; email: string }>({ id: '', name: '', email: '' });
  email    = signal<string>('');

  // ── Token helpers ──────────────────────────────────────────────────────────

  // Decode JWT payload → extract name & email, store in userData signal
  // Called after login + on every page refresh (navbar ngOnInit)
  setUserFromToken(): void {
    const token = localStorage.getItem('freshToken');
    if (!token) return;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userData.set({
        id:    payload.id    ?? '',
        name:  payload.name  ?? '',
        email: this.email(), // email comes from localStorage (not always in JWT)
      });
    } catch {
      this.userData.set({ id: '', name: '', email: '' });    
    }
  }
 

  // ── Auth actions ───────────────────────────────────────────────────────────
  signOut(): void {
    localStorage.removeItem('freshToken');
    localStorage.removeItem('email');
    this.isLogged.set(false);
    this.userData.set({ id: '', name: '', email: '' }); // ✅ clear navbar display immediately
    this.email.set('');
    this.router.navigate(['/']);
  }
  
  // ── API calls ──────────────────────────────────────────────────────────────

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
    // this is the object that we are sending to the server
    //   {
    //     "currentPassword":"123456",
    //     "password":"pass1234",
    //     "rePassword":"pass1234"
    // }
    return this.httpClient.put(`${environment.baseUrl}/api/v1/users/changeMyPassword`,data)
  }

  resetPassword(data:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
  }

  updateLoggedUserData(data:object):Observable<any>
  {
    // this is the object that we are sending to the server
    // {
    //   "name": "Ahmed Abd Al-Muti",
    //   "email": "ahmedmutt2i2@gmail.com",
    //   "phone": "01010700700"
    // }
    return this.httpClient.put(`${environment.baseUrl}/api/v1/users/updateMe/`,data)
  }

  verifyToken():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/auth/verifyToken`)
  }
}