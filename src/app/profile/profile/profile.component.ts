import { UserService } from './../../shared/services/user.service';
import { Component, inject, OnInit } from '@angular/core';
import { UserModel } from '../../shared/interfaces/user.interface';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  profilePicUrl = '';
  user: UserModel = {
    userName: '',
    name: '',
    email: '',
    secondName: '',
    profilePictureUrl: '',
    roles:[],
    status:''
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser(); 
  }
}