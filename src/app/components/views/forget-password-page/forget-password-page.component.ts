import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-forget-password-page',
    templateUrl: './forget-password-page.component.html',
    styleUrls: ['./forget-password-page.component.scss']
})
export class ForgetPasswordPageComponent implements OnInit {
    resetPasswordForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.createForm();
    }

    ngOnInit() {}

    createForm() {
        this.resetPasswordForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    onResetPassword() {
        
    }
}
