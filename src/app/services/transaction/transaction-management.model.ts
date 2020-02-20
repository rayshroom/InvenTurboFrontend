export class TxProduct {
    pid: string;
    oid: string;
    description: string;
    name: string;
    photoUrl: string;
    unit_price: number;
    quantity: number;
}

export class TxProductShippingConfig {
    pid: string;
    collapse: boolean;
    location: string[];
    location_id: string[];
    maxcount: number[];
    count: number[];
}