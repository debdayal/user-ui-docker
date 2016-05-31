import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'my-dashboard',
  template: require('./dashboard.component.html'),
  styles: [require('./dashboard.component.css')]
})
export class DashboardComponent implements OnInit {

  users: User[] = [];

  constructor(
    private router: Router,
    private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUsers()
      .then(users => this.users = users);
  }

  gotoDetail(user: User) {
    let link = ['UserDetail', { id: user.id }];
    this.router.navigate(link);
  }
}
