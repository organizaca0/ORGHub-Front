import { Component, inject, OnInit } from '@angular/core';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  userService = inject(UserService);
  title = 'ORGHUB';

  ngOnInit(){
  }
}
