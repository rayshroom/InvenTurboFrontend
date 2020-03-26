import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocationItem } from 'src/app/services/location/organization-location.model';

@Component({
    selector: 'app-location-list-item',
    templateUrl: './location-list-item.component.html',
    styleUrls: ['./location-list-item.component.scss']
})
export class LocationListItemComponent implements OnInit {
    @Input() public location: LocationItem;
    @Output() public editButtonClick = new EventEmitter<LocationItem>();
    @Output() public deleteButtonClick = new EventEmitter<LocationItem>();

    public get locationAddress() {
        const loc = this.location;
        if (loc.streetNumber && loc.city && loc.provState) {
            return !this.location.selected ?
                `${loc.streetNumber}, ${loc.city}, ${loc.provState} ${loc.postalCode}, ${loc.country}` :
                `${loc.streetNumber}<br>${loc.city}, ${loc.provState} ${loc.postalCode}<br>${loc.country}`;
        } else {
            return '(Adress Unavailable)';
        }
    }

    onEditClick(event: Event) {
        this.editButtonClick.emit(this.location);
    }

    onDeleteClick(event: Event) {
        event.stopPropagation();
        this.deleteButtonClick.emit(this.location);
    }

    constructor() {}

    ngOnInit(): void {}
}
