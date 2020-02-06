import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { FileStorageService } from 'src/app/services/storage/file-storage.service';
import { UserOrganizationService } from 'src/app/services/organization/user-organization.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { flatMap, mergeMap, last } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UserManagementService } from 'src/app/services/auth/uam.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-organization-page',
    templateUrl: './create-organization-page.component.html',
    styleUrls: ['./create-organization-page.component.scss']
})
export class CreateOrganizationPageComponent implements OnInit, AfterViewInit {
    public user: firebase.User;

    public ownerAccountForm: FormGroup;
    public organizationProfileForm: FormGroup;
    public titles = ['Mr.', 'Mrs.', 'Ms.', ' '];

    get validInputs() {
        return this.user ? this.organizationProfileForm.valid :
            this.ownerAccountForm.valid && this.organizationProfileForm.valid;
    }

    public errorMessage = '';

    public organizationLogo: {
        file: File;
        url: SafeResourceUrl;
        filename: string;
    } = { file: null, url: null, filename: '' };

    public submitBtn = {
        classes: ['btn-danger', 'btn', 'btn-block', 'submit-btn'],
        message: 'Submit',
        disabled: false,
    };

    get imageBackgroundColor() {
        return this.organizationProfileForm.get('photoBackground').value;
    }

    onImageSelection(file: File) {
        this.organizationLogo = {
            file,
            url: this.fs.getSanitizedLocalUrl(file),
            filename: file.name
        };
    }

    private getCreateOrganizationTask(owner: firebase.User) {
        const orgInfoFormData = this.organizationProfileForm.value;
        return this.organizationLogo.file ?
            this.fs.uploadFile(this.organizationLogo.file, '/images/organizations/logos')
                .pipe(flatMap(photoURL => this.o.createOrganization({ ...orgInfoFormData, uid: owner.uid, photoURL }))) :
            this.o.createOrganization({ ...orgInfoFormData, uid: owner.uid, photoURL: '' });
    }

    onSubmit() {
        this.submitBtn.classes[0] = 'btn-warning';
        this.submitBtn.message = 'Initializing...';
        this.submitBtn.disabled = true;

        const ownerInfoFormData = this.ownerAccountForm.value;

        let getUserTask: Observable<firebase.User>;
        if (this.user) {
            getUserTask = of(this.user);
        } else {
            this.submitBtn.message = 'Registering your user account...';
            getUserTask = this.uam.doRegister(ownerInfoFormData);
        }
        getUserTask.pipe(
            flatMap(user => {
                this.submitBtn.message = 'Creating your organization profile...';
                return this.getCreateOrganizationTask(user);
            })
        ).subscribe(
            () => {
                this.submitBtn.classes[0] = 'btn-success';
                this.submitBtn.message = 'Success!';
                setTimeout(() => {
                    this.router.navigate(['/dashboard']);
                }, 1000);
            },
            err => {
                this.submitBtn.classes[0] = 'btn-danger';
                this.submitBtn.message = 'Error! Try Again';
                this.submitBtn.disabled = false;
                if (!err.error.success) {
                    this.errorMessage = err.error.message;
                } else {
                    this.errorMessage = err.message;
                }
            }
        );
    }

    constructor(
        private router: Router,
        private fb: FormBuilder,
        public auth: AuthService,
        public uam: UserManagementService,
        public fs: FileStorageService,
        public o: UserOrganizationService
    ) {
        this.auth.getCurrentUser().subscribe(u => this.user = u);
        this.ownerAccountForm = this.fb.group({
            title: [null, Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: [''],
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required],
            bio: ['', Validators.maxLength(255)]
        });
        this.organizationProfileForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            image: ['', Validators.required],
            photoBackground: ['#d4d4d4', Validators.required],
            description: ['', [Validators.required, Validators.maxLength(500)]]
        });
    }

    ngAfterViewInit() {
        let lookForTooltip = true;
        for (let i = 0; lookForTooltip; i++) {
            const tooltip = document.getElementById(`tooltip_${i}_content`);
            if (tooltip) {
                tooltip.style.left = '0';
                tooltip.style.top = '0';
                lookForTooltip = false;
            }
        }
    }

    ngOnInit() {}
}
