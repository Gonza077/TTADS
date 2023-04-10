export interface ILocal {
    _id?: string;
    localName: string;
    description: string;
    shippingCost?: number;
    shippingTime?: string;
    address?: string;
    tags?: {};
    productos?: {};
    image?: File;
    imagePath?: string;
}

