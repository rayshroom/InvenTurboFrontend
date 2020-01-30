import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-credential-pane',
    templateUrl: './credential-pane.component.html',
    styleUrls: ['./credential-pane.component.scss']
})
export class CredentialPaneComponent implements OnInit {
    passwordChangeForm: FormGroup;
    errorMessage = '';
    updateSuccessful = false;

    constructor(private fb: FormBuilder, public auth: AuthService) {
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

    get oldPassword() {
        return this.passwordChangeForm.get('oldPassword');
    }

    get passwordDoesMatch() {
        return this.newPassword.value === this.confirmPassword.value;
    }

    async onPasswordChange() {
        this.errorMessage = '';
        this.updateSuccessful = false;
        if (this.passwordDoesMatch) {
            try {
                await this.auth.doChangePassword(this.oldPassword.value, this.newPassword.value);
                this.updateSuccessful = true;
            } catch (error) {
                this.updateSuccessful = false;
                if (error.code === 'auth/wrong-password') {
                    this.errorMessage = 'Error: Wrong password!';
                } else {
                    this.errorMessage = 'Error: ' + error;
                }
            }
        }
    }
}
