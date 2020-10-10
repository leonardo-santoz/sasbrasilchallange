import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from './../models/User';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user: User;
  formSignIn: FormGroup;
  loading = false;

  constructor(private authservice: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createForm(new User());
  }

  createForm(user: User) {
    this.formSignIn = this.formBuilder.group({
      email: [user.email, [Validators.required, Validators.email]],
      password: [user.password, [Validators.required]]
    });
  }

  signIn() {
    this.loading = true;

    const { email, password } = this.formSignIn.value;

    console.log(email, password)

    this.authservice.signIn(email, password).subscribe(response => {
      localStorage.setItem('@sasbrasil_token', String(response.token))
      this.router.navigate(['/'])
    })

  }

}
