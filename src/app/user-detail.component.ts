import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'my-user-detail',
  template: require('./user-detail.component.html'),
  styles: [require('./user-detail.component.css')]
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  constructor(
    private userService: UserService,
    private routeParams: RouteParams) {
  }

  ngOnInit() {
    if (this.routeParams.get('id') !== null) {
      let id = this.routeParams.get('id');
      this.navigated = true;
      this.userService.getUser(id)
          .then(user => this.user = user);
    } else {
      this.navigated = false;
      this.user = new User();
    }
  }
  save() {
    this.userService
        .save(this.user)
        .then(user => {
          this.user = user; // saved user, w/ id if new
          this.goBack(user);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }
  goBack(savedUser: User = null) {
    this.close.emit(savedUser);
    if (this.navigated) { window.history.back(); }
  }
}
