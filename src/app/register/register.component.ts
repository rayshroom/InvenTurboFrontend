import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataModelManagerService } from "../data-model-manager.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private m: DataModelManagerService,
  ) {
    this.createForm();
   }

   createForm() {
     this.registerForm = this.fb.group({
       email: ['', Validators.required ],
       password: ['',Validators.required],
       passwordConfirm: ['',Validators.required],
       displayedName: [''],
       phone: ['']
     });
   }

  //  tryFacebookLogin(){
  //    this.authService.doFacebookLogin()
  //    .then(res =>{
  //      this.router.navigate(['/user']);
  //    }, err => console.log(err)
  //    )
  //  }

  //  tryTwitterLogin(){
  //    this.authService.doTwitterLogin()
  //    .then(res =>{
  //      this.router.navigate(['/user']);
  //    }, err => console.log(err)
  //    )
  //  }

   tryGoogleLogin(){
     this.authService.doGoogleLogin()
     .then(res =>{
       this.router.navigate(['/user']);
     }, err => console.log(err)
     )
   }

   tryRegister(value){
     this.m._RegisterUser(value).subscribe(
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
    //  this.authService.doRegister(value)
    //  .then(res => {
      //  console.log(res);
      //  this.errorMessage = "";
      //  this.successMessage = "Your account has been created";
    //  }, err => {
      //  console.log(err);
      //  this.errorMessage = err.message;
      //  this.successMessage = "";
    //  })
   }

}
