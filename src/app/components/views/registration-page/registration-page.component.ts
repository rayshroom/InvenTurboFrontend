import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { uamService } from 'src/app/services/auth/uam.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.sass']
})
export class RegistrationPageComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  // Uncomment "uamService" to use our backend registration instead of firebase registration
  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    // private dataService: uamService,
  ) { 
    this.createForm();
  }

  ngOnInit() {
  }

  // Please modify form values accordingly
  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required],
      passwordConfirm: ['',Validators.required],
      displayedName: [''],
      phone: ['']
    });
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res =>{
      this.router.navigate(['/']);
    }, err => console.log(err)
    )
  }

  tryRegister(value){
    // Register directly on Firebase
    this.authService.doRegister(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "Your account has been created";
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })

    // Register through our own backend service
    // TODO: create data service to connect to our own backend.
    /*
    this.dataService.RegisterUser(value).subscribe(
      res => {
       if (res.success) {
         this.errorMessage = res.message;
         this.successMessage = "";
       } else {
         this.errorMessage = "";
         this.successMessage = "Your account has been created";
       }
       console.log(res);
      },
      err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
      }
     );
     */
  }

}
