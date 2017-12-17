import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../_services/';

import { User } from '../_models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private router: Router;
  public form: FormGroup;
  public username: AbstractControl;
  public password: AbstractControl;

  constructor(
            router: Router,
            private authenticationService: AuthenticationService,
            fb: FormBuilder) {
    this.router = router;
    this.form = fb.group({
        'username': ['', Validators.compose([Validators.required])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
  }

  ngOnInit() {
      // reset login status
      this.authenticationService.logout();
  }

//   login() {
//       this.loading = true;
//       this.authenticationService.login(this.model.username, this.model.password)
//           .subscribe(result => {
//               if (result === true) {
//                   // login successful
//                   this.router.navigate(['/']);
//               } else {
//                   // login failed
//                   this.error = 'Username or password is incorrect';
//                   this.loading = false;
//               }
//           });
//   }
  public onSubmit(values: User): void {
    if (this.form.valid) {
      this.authenticationService.login(values).subscribe(
        data => {
          console.log('login ok');
        //   const user = new UserInfo();
        //   user.token = data.headers.get('Authorization');
        //   user.login = values.login;
        //   localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/']);
        },
        error => {
          console.log('login not ok');
        },
      );
    }
  }
}
