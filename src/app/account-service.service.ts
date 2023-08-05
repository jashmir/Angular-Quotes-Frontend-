import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Login } from './login';
import { User } from './login-register';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  private readonly LoginapiUrl = 'https://localhost:44358';
  private readonly RegisterapiUrl = 'https://localhost:44358/api/Account';
  private  QuotesapiUrl = 'https://localhost:44358/api/Quotes';


  private tokenKey = 'token';

  constructor(private http: HttpClient, private router: Router) { }
  login(login: Login){
    var body = new URLSearchParams();
    body.set('Username', login.Email);
    body.set('password', login.Password);
    body.set('grant_type', 'password');
    console.log(body.toString())
  
    return this.http.post("https://localhost:44358/token", body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).pipe(
      tap((response: any) => {
        const token = response.access_token;
        localStorage.setItem('token', token);
        console.log("hey");
      })
    );
  }

  


  register(user: User): Observable<string> {
    if (user.Password !== user.ConfirmPassword) {
      throw new Error('Passwords do not match');
    }
    return this.http.post<string>(`${this.RegisterapiUrl}/register`, user).pipe(
      tap(token => localStorage.setItem(this.tokenKey, token))
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void{
    this.router.navigate(['/login']);
    return localStorage.removeItem(this.tokenKey);
  }
  isAuthenticated(): Observable<boolean> {
    const token = this.getToken();
    debugger;
    if (token) {
      // check if token is valid and not expired
      const headers = { 'Authorization': `Bearer ${token}` };
      return this.http.get<boolean>(`${this.QuotesapiUrl}`, { headers })
        .pipe(
          catchError(() => of(false)) // return false if request fails
        );
    }
    else{
      this.router.navigate['/login'];
    }
    return of(false);
  }  

}