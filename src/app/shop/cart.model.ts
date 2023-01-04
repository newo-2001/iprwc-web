import { Product } from "./product.model"

export interface Cart {
    items: Item[]
}

export interface Item {
    product: Product,
    amount: number;
}