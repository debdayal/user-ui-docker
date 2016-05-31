import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { User } from './user';
import { UserService } from './user.service';
import { UserDetailComponent } from './user-detail.component';

@Component({
  selector: 'my-users',
  template: require('./users.component.html'),
  styles: [require('./users.component.css')],
  directives: [UserDetailComponent]
})
export class UsersComponent implements OnInit {
  users: User[];
  selectedUser: User;
  addingUser = false;
  error: any;

  constructor(
    private router: Router,
    private userService: UserService) { }

  getUsers() {
    this.userService
        .getUsers()
        .then(users => this.users = users)
        .catch(error => this.error = error); // TODO: Display error message
  }

  addUser() {
    this.addingUser = true;
    this.selectedUser = null;
  }

  close(savedUser: User) {
    this.addingUser = false;
    if (savedUser) { this.getUsers(); }
  }

  delete(user: User, event: any) {
    event.stopPropagation();
    this.userService
        .delete(user)
        .then(res => {
          this.users = this.users.filter(u => u !== user);
          if (this.selectedUser === user) { this.selectedUser = null; }
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  ngOnInit() {
    this.getUsers();
  }

  onSelect(user: User) {
    this.selectedUser = user;
    this.addingUser = false;
  }

  gotoDetail() {
    this.router.navigate(['UserDetail', { id: this.selectedUser.id }]);
  }
}
