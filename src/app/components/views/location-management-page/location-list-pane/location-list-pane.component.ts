import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { OrganizationLocation, LocationItem } from 'src/app/services/location/organization-location.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrganizationLocationService } from 'src/app/services/location/organization-location.service';
import { UserOrganizationService } from 'src/app/services/organization/user-organization.service';

@Component({
    selector: 'app-location-list-pane',
    templateUrl: './location-list-pane.component.html',
    styleUrls: ['./location-list-pane.component.scss']
})
export class LocationListPaneComponent implements OnInit {
    @Input() public locations: LocationItem[];
    @Output() public newLocationAdd = new EventEmitter<OrganizationLocation>();
    @Output() public existingLocationUpdate = new EventEmitter<OrganizationLocation>();
    @Output() public existingLocationDelete = new EventEmitter<OrganizationLocation>();

    private _selectedLocation: LocationItem;
    @Input() public set selectedLocation(value: LocationItem) {
        if (this.selectedLocation) {
            this.selectedLocation.selected = false;
        }
        if (value) {
            value.selected = true;
        }
        this._selectedLocation = value;
        if (!this.editModeTriggered) {
            this.locationForm.reset();
            this.currentFormMode = this.formModes.hidden;
        } else {
            this.editModeTriggered = false;
        }
    };
    public get selectedLocation() { return this._selectedLocation; }
    @Output() public selectedLocationChange = new EventEmitter<OrganizationLocation>();

    private buttons = [
        {
            title: '<i class="fas fa-plus"></i> Add',
            classes: 'control-btn btn btn-outline-danger',
            click: () => {
                this.currentFormMode = this.formModes.add;
            }
        },
        {
            title: 'Cancel',
            classes: 'control-btn btn btn-outline-warning',
            click: () => {
                this.currentFormMode = this.formModes.hidden;
                this.locationForm.reset();
            }
        },
        {
            title: 'Submit',
            classes: 'control-btn btn btn-success',
            click: () => {
                const curOrg = this.oService.getCurrentOrganization();
                this.oLocService.createNewOrganizationLocation(curOrg.oid, this.locationForm.value).subscribe(
                    res => {
                        const newLocation = { ...res.data, ...this.locationForm.value };
                        this.newLocationAdd.emit(newLocation);
                        this.onSelectLocation(newLocation);
                    },
                );
            }
        },
        {
            title: 'Apply',
            classes: 'control-btn btn btn-primary',
            click: () => {
                const curOrg = this.oService.getCurrentOrganization();
                this.oLocService.updateOneOrganizationLocation(curOrg.oid, this.selectedLocation.locid, this.locationForm.value).subscribe(
                    res => {
                        const updatedLocation = { ...res.data, ...this.locationForm.value };
                        this.existingLocationUpdate.emit(updatedLocation);
                        this.currentFormMode = this.formModes.hidden;
                    }
                );
            }
        }
    ];

    private formModes = {
        hidden: {
            title: 'List View',
            displayLocationForm: false,
            buttons: [this.buttons[0]]
        },
        add: {
            title: 'Add Location',
            displayLocationForm: true,
            buttons: [this.buttons[2], this.buttons[1]]
        },
        edit: {
            title: 'Edit Location',
            displayLocationForm: true,
            buttons: [this.buttons[3], this.buttons[1]]
        }
    };

    public currentFormMode = this.formModes.hidden;
    public locationForm: FormGroup;

    private editModeTriggered = false;

    constructor(
        private fb: FormBuilder,
        public oService: UserOrganizationService,
        public oLocService: OrganizationLocationService
    ) {
        this.locationForm = this.fb.group({
            name: ['', Validators.required],
            streetNumber: [''], city: [''],
            provState: [''], postalCode: [''], country: [''],
        });
    }

    onSelectLocation(data: LocationItem) {
        if (!this.selectedLocation || this.selectedLocation.locid !== data.locid) {
            this.selectedLocationChange.emit(data);
        }
    }

    onLocationEditInitiate(editingLoc: LocationItem) {
        // this.onSelectLocation(editingLoc);
        this.locationForm = this.fb.group({
            name: [editingLoc.name, Validators.required],
            streetNumber: [editingLoc.streetNumber], city: [editingLoc.city],
            provState: [editingLoc.provState], postalCode: [editingLoc.postalCode], country: [editingLoc.country],
        });
        this.currentFormMode = this.formModes.edit;
        this.editModeTriggered = true;
    }

    onLocationDelete(deletingLoc: LocationItem) {
        const curOrg = this.oService.getCurrentOrganization();
        deletingLoc.deleting = true;
        this.oLocService.deleteOneOrganizationLocation(curOrg.oid, deletingLoc.locid).subscribe(
            () => {
                this.existingLocationDelete.emit(deletingLoc);
            },
            errRes => {
                deletingLoc.deleting = false;
                deletingLoc.errorMsg = errRes.error.message;
            }
        );

    }

    ngOnInit(): void { }
}
