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
  public username: AbstractControl;
  public password: AbstractControl;

  constructor(
              private router: Router,
              private authenticationService: AuthenticationService,
              private fb: FormBuilder) {
    this.router = router;
    this.signinForm = fb.group({
        'username': ['', Validators.compose([Validators.required])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });

    this.username = this.signinForm.controls['username'];
    this.password = this.signinForm.controls['password'];
  }

  ngOnInit() {
      // reset login status
      this.authenticationService.logout();
  }
  
  public onSubmit(values: SigninForm): void {
    if (this.signinForm.valid) {
      this.authenticationService.authenticate(values).subscribe(
        data => {
          console.log('login ok');
        this.router.navigate(['/']);
        },
        error => {
          console.log('login not ok');
        },
      );
    }
  }
}
