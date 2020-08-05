import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/service.index';
import Swal from 'sweetalert2';
import { User } from '../models/user.model';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(public _userService: UserService, public router: Router) { }

  ngOnInit(): void {
    init_plugins();

    this.form = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      terms: new FormControl(false),
    }, { validators: this.match('password', 'password2') });

    this.form.setValue({
      nombre: 'Test',
      email: 'test1@test1.com',
      password: '123456',
      password2: '123456',
      terms: true
    });
  }

  match(field1: string, field2: string) {

    return (group: FormGroup) => {

      let term1 = group.controls[field1].value;
      let term2 = group.controls[field2].value;

      if (term1 === term2) {
        return null;
      }
      return {
        match: true
      };
    }

  }

  registerUser() {

    if (this.form.invalid) {
      return;
    }
    if (!this.form.value.terms) {
      Swal.fire({
        title: 'Importante!',
        text: 'Debes aceptar los terminos',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      })
      return;
    }

    let user = new User(
      this.form.value.nombre,
      this.form.value.email,
      this.form.value.password
    );

    this._userService.createUser(user)
      .subscribe(resp => this.router.navigate(['/login']));

  }

}
