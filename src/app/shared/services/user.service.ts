import { Injectable } from '@angular/core';
import { UserModel } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { enviroment } from '../../../enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userKey = 'user';
  private baseUrl = enviroment.api_url;
  
  constructor(private http: HttpClient) {}

  getUser(): any {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : "";
  }

  getAll(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.baseUrl}/user/all`);
  }

  getUserName(): string {
    const user = this.getUser();
    return user ? user.userName : "";
  }

  getFirstName(): string {
    const user = this.getUser();
    return user ? user.name : "";
  }

  getSecondName(): string {
    const user = this.getUser();
    return user ? user.secondName : "";
  }

  getProfilePictureUrl(): string {
    const user = this.getUser();
    return user ? user.profilePictureUrl : "";
  }

  getRoles(): string[] {
    const user = this.getUser();
    return user ? user.roles : [];
  }

  hasRole(role: string): boolean {
    const roles = this.getRoles();
    return roles.includes(role);
  }
}
