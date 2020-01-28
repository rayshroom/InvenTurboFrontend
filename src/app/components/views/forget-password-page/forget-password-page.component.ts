import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-forget-password-page',
    templateUrl: './forget-password-page.component.html',
    styleUrls: ['./forget-password-page.component.scss']
})
export class ForgetPasswordPageComponent implements OnInit {
    public resetPasswordForm: FormGroup;

    public resetBtn = {
        message: 'Send Password Reset Link',
        classes: ['btn-danger', 'btn', 'reset-btn'],
        disabled: false
    }

    public errorMessage: string;

    constructor(private fb: FormBuilder, public auth: AuthService) {
        this.resetPasswordForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    ngOnInit() {}


    async onResetPassword() {
        try {
            this.resetBtn.message = 'Sending...';
            this.resetBtn.classes[0] = 'btn-warning';
            await this.auth.doForgetPassword(this.resetPasswordForm.value.email);
            this.resetBtn.message = 'Password reset link sent!';
            this.resetBtn.classes[0] = 'btn-success';
            this.resetBtn.disabled = true;
            this.errorMessage = '';
        } catch (err) {
            switch (err.code) {
            case 'auth/user-not-found':
                this.errorMessage = 'Email does not associated with any account.';
                break;
            default:
                this.errorMessage = err.message;
            }
            this.resetBtn.message = 'Send Password Reset Link';
            this.resetBtn.classes[0] = 'btn-danger';
        }

    }
}
