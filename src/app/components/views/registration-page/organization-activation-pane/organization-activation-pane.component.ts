import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-organization-activation-pane',
    templateUrl: './organization-activation-pane.component.html',
    styleUrls: ['./organization-activation-pane.component.scss']
})
export class OrganizationActivationPaneComponent implements OnInit {
    public registerFormOrganization: FormGroup;
    public errorMessage = '';

    constructor(private fb: FormBuilder, private router: Router) {
        this.registerFormOrganization = this.fb.group({
            activationCode: ['', Validators.required]
        });
    }

    onOrganizationActivate() {
        this.router.navigate(['/organization/create']);
    }

    ngOnInit() {}
}
