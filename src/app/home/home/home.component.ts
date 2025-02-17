import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FacaParteComponent } from './faca-parte/faca-parte.component';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{
  readonly dialog = inject(MatDialog);
  isLoggedIn:boolean = false;

  constructor(private authService: AuthService){
  }

  openDialog() {
    const dialogRef = this.dialog.open(FacaParteComponent, {
      width: '400px', 
      height: '600px' 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
