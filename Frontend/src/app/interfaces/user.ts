export interface IUser {
    _id?: string;
    userName: string;
    password: string;
    completeName?: string;
    gender?:string;
    phone?: string;
    address?: string;
    email?: string;
}