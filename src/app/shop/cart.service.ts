import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { OrderItem, OrderRequest } from "./order.model";
import { Product } from "./product.model";

@Injectable({ providedIn: "root" })
export class CartService {
    cartSubject: BehaviorSubject<OrderRequest> = new BehaviorSubject<OrderRequest>({items: []});

    constructor() {
        const cart = localStorage.getItem("cart");
        if (cart) {
            this.cartSubject.next(JSON.parse(cart));
        }
    }

    addToCart(item: OrderItem): void {
        const cart: OrderRequest = this.cartSubject.getValue();
        const present = cart.items.find(x => x.product.id == item.product.id);

        if (present) {
            present.amount += item.amount;
        } else {
            cart.items.push(item);
        }

        this.saveCart(cart);
    }

    removeAmountFromCart(item: OrderItem): void {
        const cart: OrderRequest = this.cartSubject.getValue();
        const present = this.getItem(cart, item.product);
        if (!present) return;

        const index = cart.items.indexOf(present);
        if (item.amount >= present.amount) {
            cart.items.splice(index, 1);
        } else {
            cart.items[index].amount -= item.amount;
        }

        this.saveCart(cart);
    }

    removeProductFromCart(product: Product): void {
        const cart: OrderRequest = this.cartSubject.getValue();
        const present = this.getItem(cart, product);
        if (!present) return;

        const index = cart.items.indexOf(present);
        cart.items.splice(index, 1);

        this.saveCart(cart);
    }

    clearCart() {
        localStorage.removeItem("cart");
        this.cartSubject.next({items: []});
    }

    private saveCart(cart: OrderRequest): void {
        localStorage.setItem("cart", JSON.stringify(cart));
        this.cartSubject.next(cart);
    }

    private getItem = (cart: OrderRequest, product: Product) => cart.items.find(x => x.product.id == product.id);
}