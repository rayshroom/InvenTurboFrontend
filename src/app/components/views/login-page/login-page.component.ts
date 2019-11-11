import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';

  // Creates a form using angular Form builder on load
  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res => {
      this.router.navigate(['/']);
    })
  }

  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      this.router.navigate(['/']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }

}
