import { Component, OnDestroy, OnInit } from "@angular/core";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { UserInfo } from "src/app/auth/user-info.model";
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

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.userInfoSubscription = this.authService.userInfo.subscribe(userInfo => this.userInfo = userInfo)
    }

    ngOnDestroy(): void {
        this.userInfoSubscription?.unsubscribe();
    }

    logout = () => this.authService.logout();
    isLoggedIn = () => this.authService.isLoggedIn();
}