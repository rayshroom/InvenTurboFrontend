export class LocationInventory {
    locid: string;
    name?: string;
    address?: string;
    quantity: number;
}

export class ProductStock {
    pid: string;
    oid: string;
    name: string;
    description: string;
    photoURL?: string;
    total_quantity: number;
    unit_price: number;
    inventoryByLocation?: LocationInventory[];
    hidden: boolean = false;
}
