import { Component, OnDestroy, OnInit } from "@angular/core";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { UserInfo } from "src/app/auth/user-info.model";
import { Cart } from "src/app/shop/cart.model";
import { CartService } from "src/app/shop/cart.service";
import { Optional } from "../optional.model";

@Component({
    selector: "app-nav",
    templateUrl: "./nav.component.html",
    styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit, OnDestroy {
    faShoppingCart = faShoppingCart

    userInfoSubscription?: Subscription;
    userInfo: Optional<UserInfo> = null;

    cartSubscription?: Subscription
    cart: Cart = {items:[]};

    constructor(private authService: AuthService, private cartService: CartService) {}

    ngOnInit(): void {
        this.userInfoSubscription = this.authService.userInfo.subscribe(userInfo => this.userInfo = userInfo)
        this.cartSubscription = this.cartService.cartSubject.subscribe(cart => this.cart = cart);
    }

    ngOnDestroy(): void {
        this.userInfoSubscription?.unsubscribe();
        this.cartSubscription?.unsubscribe();
    }

    logout = () => this.authService.logout();
    isLoggedIn = () => this.authService.isLoggedIn();
}