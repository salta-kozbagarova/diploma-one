import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../_services/';

import { User, SigninForm } from '../_models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public signinForm: FormGroup;
  public login: AbstractControl;
  public password: AbstractControl;

  constructor(
              private router: Router,
              private authenticationService: AuthenticationService,
              private fb: FormBuilder) {
    this.router = router;
    this.signinForm = fb.group({
        'login': ['', Validators.compose([Validators.required])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });

    this.login = this.signinForm.controls['login'];
    this.password = this.signinForm.controls['password'];
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
  public onSubmit(values: SigninForm): void {
    if (this.signinForm.valid) {
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
