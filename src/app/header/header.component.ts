import { AfterViewInit, Component, OnInit } from '@angular/core';

import { Router,NavigationStart  } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../_services/';

import { AuthUser, SigninForm, SignupForm } from '../_models';

declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  public signinForm: FormGroup;
  public signupForm: FormGroup;
  public username: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;
  public passwordConfirm: AbstractControl;
  public authUser: AuthUser;

  public signInSubmitted: boolean = false;
  public signUpSubmitted: boolean = false;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private fb: FormBuilder) {
    this.signinForm = this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });

    this.signupForm = this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      passwordConfirm: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    }, this.passwordMatchValidator);

    this.authUser = this.authenticationService.getCurrentUser();
    this.authenticationService.currentUser.subscribe(curUser => this.setCurrentUser(curUser));
  }

  ngOnInit() {
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

  public setCurrentUser(curUser: AuthUser): void {
    this.authUser = curUser;
  }

  public onSignin(values: SigninForm): void {
    if (this.signinForm.valid) {
      this.authenticationService.authenticate(values).subscribe(
        data => {
          console.log('login ok');
          $("#authModal").modal('hide');
          //this.router.navigate(['/']);
        },
        error => {
          console.log('login not ok');
        },
      );
    } else{
      this.signinForm.markAsTouched();
      this.signInSubmitted = true;
    }
  }

  public onSignup(values: SignupForm): void {
    if (this.signupForm.valid) {
      $('#authModal').modal('hide');
    } else{
      this.signupForm.markAsTouched();
      this.signUpSubmitted = true;
    }
    //this.router.navigate(['/']);
  }

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  public passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password').value === formGroup.get('passwordConfirm').value ? null : {'mismatch': true};
  }
}
