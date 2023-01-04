import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Cart, Item } from "./cart.model";
import { Product } from "./product.model";

@Injectable({ providedIn: "root" })
export class CartService {
    cartSubject: BehaviorSubject<Cart> = new BehaviorSubject<Cart>({items: []});

    constructor() {
        const cart = localStorage.getItem("cart");
        if (cart) {
            this.cartSubject.next(JSON.parse(cart));
        }
    }

    addToCart(item: Item): void {
        const cart: Cart = this.cartSubject.getValue();
        const present = cart.items.find(x => x.product.id == item.product.id);

        if (present) {
            present.amount += item.amount;
        } else {
            cart.items.push(item);
        }

        this.saveCart(cart);
    }

    removeAmountFromCart(item: Item): void {
        const cart: Cart = this.cartSubject.getValue();
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
        const cart: Cart = this.cartSubject.getValue();
        const present = this.getItem(cart, product);
        if (!present) return;

        const index = cart.items.indexOf(present);
        cart.items.splice(index, 1);

        this.saveCart(cart);
    }

    private saveCart(cart: Cart): void {
        localStorage.setItem("cart", JSON.stringify(cart));
        this.cartSubject.next(cart);
    }

    private getItem = (cart: Cart, product: Product) => cart.items.find(x => x.product.id == product.id);
}