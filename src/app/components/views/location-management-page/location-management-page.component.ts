import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OrganizationLocation } from 'src/app/services/location/organization-location.model';
import { UserOrganizationService } from 'src/app/services/organization/user-organization.service';
import { OrganizationLocationService } from 'src/app/services/location/organization-location.service';

@Component({
    selector: 'app-location-management-page',
    templateUrl: './location-management-page.component.html',
    styleUrls: ['./location-management-page.component.scss']
})
export class LocationManagementPageComponent implements OnInit {
    public locations: OrganizationLocation[];
    public selectedLocation: OrganizationLocation;

    constructor(
        public orgSerivce: UserOrganizationService,
        public orgLocService: OrganizationLocationService,
    ) {
        const curOrg = this.orgSerivce.getCurrentOrganization();
        this.orgLocService.getAllOrganizationLocation(curOrg.oid).subscribe(locs => {
            this.locations = locs;
            this.selectedLocation = this.locations[0];
        });
    }

    public selectLocation(location: OrganizationLocation) {
        this.selectedLocation = location;
    }

    public addLocation(location: OrganizationLocation) {
        this.locations.unshift(location);
    }

    public updateLocation(location: OrganizationLocation) {
        const original = this.selectedLocation;
        this.selectedLocation = { ...Object.assign(this.selectedLocation, location) };
        setTimeout(() => this.selectedLocation = original, 0);
    }

    public deleteLocation(location: OrganizationLocation) {
        for (const [i, loc] of this.locations.entries()) {
            if (loc.locid === location.locid) {
                this.locations.splice(i, 1);
                if (loc.locid === this.selectedLocation.locid) {
                    this.selectedLocation = this.locations[i];
                }
                break;
            }
        }
    }

    ngOnInit(): void { }
}
