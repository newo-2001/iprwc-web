import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { OrderItem, OrderRequest, totalPrice } from "../order.model";
import { CartService } from "../cart.service";
import { OrderService } from "../order.service";
import { Router } from "@angular/router";
import { faCreditCard, faShoppingCart, faTrashCan } from "@fortawesome/free-solid-svg-icons";

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
            complete: () => {
                this.cartService.clearCart();
                this.router.navigate(["/orders"]);
            },
            error: response => this.orderError = response.error.reason
        });
    }

    removeItems(item: OrderItem): void {
        if (item.amount >= this.cartService.amountInCart(item.product)) {
            this.cartService.removeProductFromCart(item.product);
        }
        this.cartService.removeAmountFromCart(item);
    }

    totalCost = (): string => totalPrice(this.cart.items).toFixed(2);
}