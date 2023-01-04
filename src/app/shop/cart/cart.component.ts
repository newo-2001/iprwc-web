import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { OrderRequest } from "../order.model";
import { CartService } from "../cart.service";
import { OrderService } from "../order.service";
import { Router } from "@angular/router";
import { faCreditCard, faShoppingCart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Product } from "../product.model";

@Component({
    selector: "shop-cart",
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit, OnDestroy {
    cart: OrderRequest = {items: []};
    cartSubscription?: Subscription;

    icons = { faTrashCan, faCreditCard, faShoppingCart }

    orderError?: string;

    constructor(private cartService: CartService, private orderService: OrderService, private router: Router) {}

    ngOnInit(): void {
        this.cartSubscription = this.cartService.cartSubject.subscribe(cart => this.cart = cart);
    }

    ngOnDestroy(): void {
        this.cartSubscription?.unsubscribe();
    }

    placeOrder(): void {
        this.orderService.placeOrder(this.cart).subscribe({
            complete: () => this.router.navigate(["/orders?success=true"]),
            error: response => this.orderError = response.error.reason
        });
    }

    removeProduct = (product: Product): void => this.cartService.removeProductFromCart(product);

    totalCost = (): string => this.cart.items.reduce((cost, item) => cost + item.product.price / 100 * item.amount, 0).toFixed(2);
}