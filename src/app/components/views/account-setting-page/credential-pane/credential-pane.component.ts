import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-credential-pane',
  templateUrl: './credential-pane.component.html',
  styleUrls: ['./credential-pane.component.scss']
})
export class CredentialPaneComponent implements OnInit {
  passwordChangeForm: FormGroup;
  errorMessage: string = '';
  updateSuccessful: boolean = false;

  constructor(
      private fb: FormBuilder
  ) {
      this.createForm();
  }

  ngOnInit() {}

  createForm() {
      this.passwordChangeForm = this.fb.group({
          oldPassword: ['', Validators.required],
          newPassword: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required]
      });
  }

  get newPassword() {
    return this.passwordChangeForm.get('newPassword');
  }

  get confirmPassword() {
    return this.passwordChangeForm.get('confirmPassword');
  }

  get oldPassword(){
    return this.passwordChangeForm.get('oldPassword');
  }

  get passwordDoesMatch(){
    return (this.newPassword.value === this.confirmPassword.value);
  }

  async onSignIn() {
    this.errorMessage = '';
    this.updateSuccessful = false;
    if(this.passwordDoesMatch){
      var user = firebase.auth().currentUser;
      var credential = firebase.auth.EmailAuthProvider.credential( user.email, this.oldPassword.value)
      var newPassword = this.newPassword.value;
      
      user.reauthenticateAndRetrieveDataWithCredential(credential).then(() =>{
        user.updatePassword(newPassword).then(() => {
          this.updateSuccessful = true;
        }).catch((error) => {
          console.log(error);
          this.updateSuccessful = false;
          this.errorMessage = "Error: " + error;
        });
      }).catch((error) => {
          console.log(error);
          this.updateSuccessful = false;
          if(error.code == 'auth/wrong-password'){
            this.errorMessage = "Error: Wrong password!";
          }else{
            this.errorMessage = "Error: " + error;
          }
      });
    }
  }
}
