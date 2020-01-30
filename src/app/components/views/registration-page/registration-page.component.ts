import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserManagementService } from 'src/app/services/auth/uam.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { flatMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
    selector: 'app-registration-page',
    templateUrl: './registration-page.component.html',
    styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
    registerFormPersonal: FormGroup;
    registerFormOrganization: FormGroup;
    errorMessage = '';

    titles = [ 'Mr.', 'Mrs.', 'Ms.', ' ' ];

    constructor(
        public authService: AuthService,
        public afAuth: AngularFireAuth,
        public uam: UserManagementService,
        private router: Router,
        private fb: FormBuilder
    ) {
        this.createForms();
    }

    createForms() {
        this.registerFormPersonal = this.fb.group({
            title: [null, Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email] ],
            phone: [''],
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required],
        });
        this.registerFormOrganization = this.fb.group({
            activationCode: ['', Validators.required]
        });
    }

    ngOnInit() {
    }

    onPersonalRegister() {
        const formData = this.registerFormPersonal.value;
        this.uam.doRegister(formData).pipe(
            flatMap(() => this.authService.doLogin(formData)),
            flatMap(() => this.authService.getCurrentUser()),
            flatMap(user => user.sendEmailVerification())
        ).subscribe(
            () => {
                this.router.navigate(['/welcome']);
            },
            (err: HttpErrorResponse) => {
                this.errorMessage = err.message;
            }
        );
    }
}
