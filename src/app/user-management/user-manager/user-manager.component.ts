import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../shared/interfaces/user.interface';
import { UserService } from '../../shared/services/user.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss'],
})
export class UserManagerComponent implements OnInit {
  users: UserModel[] = [];
  roles: string[] = ["ADMIN", "USER"];
  loading: boolean = false;
  selectedRole:string='';
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.loading = true;
    this.userService.getAll().subscribe((users: UserModel[]) => {
      this.users = users;
      setTimeout(() => {
        this.loading = false;
      }, 500);
    });
  }

  changeStatus(username: string, status: string) {}

  deleteUser(username: string) {}
}
