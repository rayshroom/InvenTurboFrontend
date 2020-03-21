import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { OrganizationLocation } from 'src/app/services/location/organization-location.model';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';

@Component({
    selector: 'app-location-map',
    templateUrl: './location-map.component.html',
    styleUrls: ['./location-map.component.scss']
})
export class LocationMapComponent implements OnInit {
    @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
    @ViewChild(MapInfoWindow, { static: false }) markerInfoWindow: MapInfoWindow;
    public initialMapCenter: google.maps.LatLngLiteral;

    private _selectedLocation: OrganizationLocation;
    @Input() public set selectedLocation(value: OrganizationLocation) {
        if (value) {
            this.initialMapCenter = value.geoCoord;
        }
        this._selectedLocation = value;
        if (this.map && this.markerInfoWindow) {
            if (value) {
                this.map.panTo(value.geoCoord);
            }
            if (!this.curMapMarker) {
                this.markerInfoWindow.close();
            } else {
                this.curMapMarker = null;
            }
        }
    };
   public get selectedLocation() { return this._selectedLocation; }
   @Output() public selectedLocationChange = new EventEmitter<OrganizationLocation>();
    private curMapMarker: MapMarker;

    @Input() public locations: OrganizationLocation[];

    public get isValidGeoCoord() {
        const { lat, lng } = this.selectedLocation.geoCoord;
        return lat !== 0 || lng !== 0;
    }

    constructor() { }

    onLocationSelect(marker: MapMarker, data: OrganizationLocation) {
        this.selectedLocationChange.emit(data);
        this.curMapMarker = marker;
        this.markerInfoWindow.open(marker);
    }

    onMapClick() {
        this.markerInfoWindow.close();
    }

    ngOnInit(): void {
    }
}
