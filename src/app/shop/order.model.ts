import { Product } from "./product.model"

export interface Order {
    id: string;
    userId: string;
    orderTime: Date;
    items: OrderItem[];
}

export interface OrderRequest {
    items: OrderItem[]
}

export interface OrderItem {
    product: Product;
    amount: number;
}

export function totalPrice(items: OrderItem[]) {
    return items.reduce((cost, item) => cost + item.product.price / 100 * item.amount, 0);
}