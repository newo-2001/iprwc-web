import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    title = "webshop-frontend";

    constructor(private authService: AuthService) {
        this.authService.autoLogin();
    }

    ngOnInit(): void {
        this.authService.autoLogin();
    }
}
