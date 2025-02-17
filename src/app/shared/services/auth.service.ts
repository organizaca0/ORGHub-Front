import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { enviroment } from '../../../enviroment/enviroment';
import { LoginRequest } from '../interfaces/LoginRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${enviroment.api_url}/auth/login`

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(this.getUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(login : LoginRequest) {
    return this.http.post<any>(this.apiUrl, login ).pipe(
      tap((response: any) => {
        this.setSession(response.jwt, response);
      })
    );
  }

  private setSession(token: string, user: any) {
    localStorage.setItem('jwt', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  public getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  public getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}
