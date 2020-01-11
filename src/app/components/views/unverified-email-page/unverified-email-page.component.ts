import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-unverified-email-page',
    templateUrl: './unverified-email-page.component.html',
    styleUrls: ['./unverified-email-page.component.scss']
})
export class UnverifiedEmailPageComponent implements OnInit {
    public resendBtnMessage = 'Click here to resend verification email';
    public resendBtnClasses = ['btn-danger', 'btn', 'btn-block', 'btn-lg', 'resend-btn'];
    public resendBtnDisabled = false;

    public user: firebase.User;

    constructor(public auth: AuthService) {
        this.auth.getCurrentUser().subscribe(user => this.user = user);
    }

    ngOnInit() {}

    async onResendVerificationEmail() {
        this.resendBtnMessage = 'Sending...';
        this.resendBtnClasses[0] =  'btn-warning';
        await this.user.sendEmailVerification();
        this.resendBtnMessage = 'Verification email sent';
        this.resendBtnClasses[0] = 'btn-success';
        this.resendBtnDisabled = true;
    }
}
