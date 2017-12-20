import { Component, OnInit } from '@angular/core';

import { User, AuthUser } from '../_models/';
import { UserService, AuthenticationService } from '../_services/';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: User[] = [];

  currentUser: AuthUser;

  public username: string = "hhhh";

  token: string;
  
  constructor(private userService: UserService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // get users from secure api end point
    this.userService.getUsers()
      .subscribe(users => {
          this.users = users;
      });
    this.currentUser = this.authenticationService.getCurrentUser();
    if(this.currentUser){
      this.username = this.currentUser.username;
      this.token = 'Bearer ' + this.currentUser.token;
    }
  }
}
