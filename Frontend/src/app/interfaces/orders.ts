export interface IOrders {
    creationDate: Date;
    description:String;
    user: {};
    costoEnvio?: number;
    tiempoEnvio?: string;
    Local: {};
    productos: {};//Dudas de si esto debe ir dentro del local
}

