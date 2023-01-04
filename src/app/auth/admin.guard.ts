import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean | UrlTree {
        return this.authService.userInfo.getValue()?.user.roles.includes("ROLE_ADMIN")
            ? true : this.router.createUrlTree(["/"])
    }
}