import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailP: string;
  form: FormGroup;
  auth2: any;

  constructor(public router: Router, public _userService: UserService) { }

  ngOnInit(): void {

    init_plugins();
    this.googleInit();

    this.emailP = localStorage.getItem('email') || '';

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      remember: new FormControl(false),
    });

    if (this.emailP.length > 1) {
      this.form.value.remember = true;
    }

    this.form.setValue({
      email: this.emailP,
      password: '',
      remember: this.form.value.remember
    });
  }

  googleInit() {

    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '76247310633-2fm048joms58rctgtldgnkiruf7pb87d.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element) {

    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this._userService.loginGoogle(token)
        .subscribe(() => window.location.href = '/dashboard');
    });
  }

  login() {

    if (this.form.invalid) {
      return;
    }

    let user = new User(null, this.form.value.email, this.form.value.password);
    this._userService.login(user, this.form.value.remember)
      .subscribe(() => this.router.navigate(['/dashboard']));
    //this.router.navigate(['/dashboard']);
  }

}
