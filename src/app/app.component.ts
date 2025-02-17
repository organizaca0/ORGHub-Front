import { TcsService } from './shared/services/tcs.service';
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { ImageService } from './shared/services/image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  userService = inject(UserService);
  //imageService = inject(ImageService);
  tcsService = inject(TcsService);
  title = 'ORGHUB';

  ngOnInit(){
  }
}
