import { Component, OnInit, Input } from '@angular/core';
import { UserOrganization } from 'src/app/services/organization/user-organization.model';
import { UserOrganizationService } from 'src/app/services/organization/user-organization.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-inventory-panel-header',
    templateUrl: './inventory-panel-header.component.html',
    styleUrls: ['./inventory-panel-header.component.scss']
})
export class InventoryPanelHeaderComponent implements OnInit {
    public org: UserOrganization;

    @Input()
    public title: string;

    constructor(
        public userOrg: UserOrganizationService,
        private loc: Location
    ) {
        this.org = this.userOrg.getCurrentOrganization();
        if (!this.org.photoURL) {
            this.org.photoURL = 'assets/default-org-avatar.png';
        }
    }

    ngOnInit() {}

    goBack() {
        this.loc.back();
    }
}
