import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { flatMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserManagementService } from 'src/app/services/auth/uam.service';
import { PersonnelService } from 'src/app/services/personnel/personnel.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-personal-registration-pane',
    templateUrl: './personal-registration-pane.component.html',
    styleUrls: ['./personal-registration-pane.component.scss']
})
export class PersonalRegistrationPaneComponent implements OnInit {
    public registerFormPersonal: FormGroup;
    public errorMessage = '';

    public titles = [ 'Mr.', 'Mrs.', 'Ms.', ' ' ];

    constructor(
        public authService: AuthService,
        public afAuth: AngularFireAuth,
        public uam: UserManagementService,
        private router: Router,
        private fb: FormBuilder,
        private personnelService: PersonnelService
    ) {
        this.registerFormPersonal = this.fb.group({
            title: [null, Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email] ],
            phone: [''],
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required],
        });
    }

    onPersonalRegister() {
        const formData = this.registerFormPersonal.value;
        this.uam.doRegister(formData).subscribe(
            () => {
                this.personnelService.autoAcceptUser(formData.email);
                this.router.navigate(['/welcome']);
            },
            (err: HttpErrorResponse) => {
                this.errorMessage = err.message;
            }
        );
    }

    ngOnInit() {}
}
