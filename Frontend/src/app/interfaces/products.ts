export interface IProducts {
    name: string;
    description: string;
    category: string;
    subCategory: string;
    price: number;
    image?: File;
    imagePath?: string;
}