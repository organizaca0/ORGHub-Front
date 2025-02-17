import { Component, inject } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserModel } from '../shared/interfaces/user.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
interface Projeto {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone: true,
  imports: [
    MatSlideToggleModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
  ],
})
export class NavBarComponent {
  userService = inject(UserService);

  isMenuOpen: boolean = false;
  isAuthenticated: boolean = false;
  user: UserModel = {
    userName: '',
    name: '',
    email: '',
    secondName: '',
    profilePictureUrl: '',
    roles:[],
    status:''
  };

  profileImageSrc: string | null = null;
  projetos: Projeto[] = [
    { value: 'orgrow', viewValue: 'ORGrow' },
    { value: 'projetos', viewValue: 'Proj 2' },
    { value: 'proj3', viewValue: 'Proj 3' },
  ];

  projetoControl = new FormControl('');
  
  form = new FormGroup({
    projeto: this.projetoControl,
  });

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.projetoControl.valueChanges.subscribe((value) => {
      if (value) {
        this.navigateToRoute(value);
      }
    });
    this.isAuthenticated = this.authService.isLoggedIn();
    this.user = this.userService.getUser(); 
  }

  navigateToRoute(value: string) {
    this.router.navigate([`/${value}`]);
  }

  logout(){
    this.authService.logout();
    window.location.href = window.location.href;
  }

  hasRole(role:string):boolean{
    return this.userService.hasRole(role);
  }
}
