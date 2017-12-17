import { AfterViewInit, Component } from '@angular/core';

import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from './_services/';

import { User } from './_models';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private router: Router;
  public form: FormGroup;
  public username: AbstractControl;
  public password: AbstractControl;
  public email: AbstractControl;
  public login: AbstractControl;

  constructor(
              router: Router,
              private authenticationService: AuthenticationService,
              fb: FormBuilder) {
    this.router = router;
    this.form = fb.group({
    'username': ['', Validators.compose([Validators.required])],
    'email': ['', Validators.compose([Validators.required])],
    'login': ['', Validators.compose([Validators.required])],
    'password': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });

    this.username = this.form.controls['username'];
    this.email = this.form.controls['email'];
    this.login = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  ngAfterViewInit() {
    $(document).ready(function(){
      $('#signupForm').hide();
        $('#signup').click(function(){
            $('#signinForm').hide();
            $('#signupForm').toggle("slide", { direction: "right" }, 500);
        });
        $('#signin').click(function(){
          $('#signupForm').hide();
          $('#signinForm').toggle("slide", { direction: "left" }, 500);
      });
    });
  }

  public onSubmit(values: User): void {
    if (this.form.valid) {
      this.authenticationService.login(values).subscribe(
        data => {
          console.log('login ok');
        //   const user = new UserInfo();
        //   user.token = data.headers.get('Authorization');
        //   user.login = values.login;
        //   localStorage.setItem('user', JSON.stringify(user));
        //this.router.navigate(['/']);
        },
        error => {
          console.log('login not ok');
        },
      );
    }
  }
}
