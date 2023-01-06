import { Category } from "./category.model";

export interface Product {
    id: string;
    name: string;
    description?: string;
    thumbnailUri?: string;
    categories?: Category[],
    price: number;
}

export interface CreateProductDto {
    name: string,
    price: number,
    thumbnailUri?: string,
    description?: string
}