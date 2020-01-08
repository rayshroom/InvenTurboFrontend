export class LocationInventory {
    name: string;
    address: string;
    quantity: number;
}

export class ProductStock {
    pid: string;
    oid: string;
    name: string;
    description: string;
    photoURL?: string;
    total_quantity: number;
    inventoryByLocation?: LocationInventory[];
}
