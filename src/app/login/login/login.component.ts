import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { LoginRequest } from '../../shared/interfaces/LoginRequest.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  value: string | undefined;
  loginForm:FormGroup;

  loading:boolean=false;

  loginMessage:string='';

  showLoginError:boolean =false;

  constructor(
    private authService : AuthService,
    private router : Router
  ){
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/home']); 
    }
  }

  login() {
    const login: LoginRequest = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    };
    this.loading = true;
    if(login.password && login.username != null){
      this.authService.login(login)   
      .subscribe(
        response => {
          if (response.jwt) {
            window.location.href = window.location.href; 
            this.loading = false;
          }     
        },
        error => {
          this.loginError(error)
        }
      );
    }else{
      this.loading = false;
      this.showLoginError = true;
      this.loginMessage= "É necessário informar um usuário e senha";
    }
    
  }
  
  loginError(errorMessage: any){
    this.loading = false;
    this.showLoginError = true;
    this.loginMessage= errorMessage.error.error;
  }

  onInputChange(event: any): void {
    const input = event.target.value.toLowerCase();
    this.loginForm.get('username')?.setValue(input, { emitEvent: false });
  }
  
}
