export class OrganizationLocation {
    locid: string;
    name: string;
    streetNumber: string;
    city: string;
    provState: string;
    postalCode: string;
    country: string;
    geoCoord: google.maps.LatLngLiteral;
}

export class LocationItem extends OrganizationLocation {
    selected = false;
    errorMsg = '';
    deleting = false;
}
