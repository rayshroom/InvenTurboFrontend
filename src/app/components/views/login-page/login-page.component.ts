import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    loginForm: FormGroup;
    errorMessage = '';

    constructor(
        public authService: AuthService,
        private loc: Location,
        private fb: FormBuilder
    ) {
        this.createForm();
    }

    ngOnInit() {}

    createForm() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    async onSignIn() {
        try {
            await this.authService.doLogin(this.loginForm.value);
            this.loc.back();
        } catch (err) {
            switch (err.code) {
            case 'auth/user-not-found':
                this.errorMessage = 'User not found. Are you a new user?';
                break;
            default:
                this.errorMessage = err.message;
                this.loginForm.get('password').setValue('');
            }
        }
    }
}
