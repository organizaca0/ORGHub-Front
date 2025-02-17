import { UserService } from './../shared/services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuard implements CanActivate {

  constructor(private UserService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.UserService.hasRole('ADMIN')) {
      return true; 
    }

    this.router.navigate(['/home']);
    return false;
  }
}
