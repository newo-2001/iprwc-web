import { Component, OnDestroy, OnInit } from "@angular/core";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { UserInfo } from "src/app/auth/user-info.model";
import { OrderRequest } from "src/app/shop/order.model";
import { CartService } from "src/app/shop/cart.service";
import { Optional } from "../optional.model";

@Component({
    selector: "app-nav",
    templateUrl: "./nav.component.html",
    styleUrls: ["./nav.component.scss"]
})
export class NavComponent {
    icons = { faShoppingCart };

    constructor(private authService: AuthService, private cartService: CartService) {}

    totalItemsInCart = () => this.cartService.totalItems();

    logout = () => this.authService.logout();
    isLoggedIn = () => this.authService.isLoggedIn();
}