import { productTypeI } from "./productTypeI";

export interface ProductI {
    name: string;
    price: number;
    productType: productTypeI;
}