import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'aep-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder, public route: Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  getErrorMessage(): string {
    if (this.email.hasError('required') || this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit(): void {
    // this.submitted = true;
    if (this.form.valid) {
      console.log(JSON.stringify(this.form.value));
    }
  }

  goToForgotPassword(): void {
    this.route.navigate(['login/forgot-password']);
  }
}
