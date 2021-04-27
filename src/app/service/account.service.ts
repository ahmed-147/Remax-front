import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

import  jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { IAccount } from '../model/interface/iaccount';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiRoot = 'http://localhost:8000/auth/';

  constructor(private http: HttpClient) { }

  private setSession(authResult) {
    const token = authResult.token;
    const payload = <JWTPayload> jwtDecode(token);
    const expiresAt = moment.unix(payload.exp);

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  login(username: string, password: string) {
    return this.http.post(
      this.apiRoot.concat('login/'),
      { username, password }
    ).pipe(
      tap(response => this.setSession(response)),
      shareReplay(),
    );
  }
  getAllAccounts(): Observable<IAccount[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'multipart/form-data',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.get<IAccount[]>('http://localhost:8000/account/accounts/', httpOptions);
  }

  signup(pst: any): Observable<IAccount>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'multipart/form-data',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.post<IAccount>('http://localhost:8000/account/accounts/', pst, httpOptions)
  }
  

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }
  getAccountById(id): Observable<IAccount>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.get<IAccount>(`http://localhost:8000/account/accounts/${id}/`, httpOptions)
  }
  updateAccount(id, pst: any): Observable<IAccount> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.patch<IAccount>(`http://localhost:8000/account/accounts/${id}/`, pst, httpOptions)
  }
  deleteAccountById(id): Observable<IAccount>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.delete<IAccount>(`http://localhost:8000/account/accounts/${id}/`, httpOptions)

  }

  refreshToken() {
    if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
      return this.http.post(
        this.apiRoot.concat('refresh-token/'),
        { token: this.token }
      ).pipe(
        tap(response => this.setSession(response)),
        shareReplay(),
      ).subscribe();
    }

}
getExpiration() {
  const expiration = localStorage.getItem('expires_at');
  const expiresAt = JSON.parse(expiration);

  return moment(expiresAt);
}

isLoggedIn() {
  return moment().isBefore(this.getExpiration());
}

isLoggedOut() {
  return !this.isLoggedIn();
}
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const token = localStorage.getItem('token');

  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', 'JWT '.concat(token))
    });

    return next.handle(cloned);
  } else {
    return next.handle(req);
  }
}
}

@Injectable()
export class AuthGuard implements CanActivate {

constructor(private AccountService: AccountService, private router: Router) { }

canActivate() {
  if (this.AccountService.isLoggedIn()) {
    this.AccountService.refreshToken();

    return true;
  } else {
    this.AccountService.logout();
    this.router.navigate(['login']);

    return false;
  }
}
}

interface JWTPayload {
user_id: number;
username: string;
email: string;
exp: number;
}