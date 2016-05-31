import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { DashboardComponent } from './dashboard.component';
import { UsersComponent } from './users.component';
import { UserDetailComponent } from './user-detail.component';
import { UserService } from './user.service';
import '../../public/css/styles.css';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['Dashboard']">Dashboard</a>
      <a [routerLink]="['Users']">Users</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [require('./app.component.css')],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    UserService
  ]
})
@RouteConfig([
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/detail/:id',
    name: 'UserDetail',
    component: UserDetailComponent
  },
  {
    path: '/Users',
    name: 'Users',
    component: UsersComponent
  }
])
export class AppComponent {
  title = 'Directory of Users';
}
