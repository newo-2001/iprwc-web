import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Cart } from "../cart.model";
import { CartService } from "../cart.service";

@Component({
    selector: "shop-cart",
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit, OnDestroy {
    cart: Cart = {items: []};
    cartSubscription?: Subscription;

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.cartSubscription = this.cartService.cartSubject.subscribe(cart => this.cart = cart);
    }

    ngOnDestroy(): void {
        this.cartSubscription?.unsubscribe();
    }
}