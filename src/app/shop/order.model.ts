import { Product } from "./product.model"

export interface Order {
    id: string,
    userId: string,
    orderTime: Date,
    items: OrderItem[]
}

export interface OrderRequest {
    items: OrderItem[]
}

export interface OrderItem {
    product: Product,
    amount: number;
}