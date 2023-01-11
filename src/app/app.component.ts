import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { AuthService } from "./auth/auth.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    title = "The EDM record shop";

    constructor(private authService: AuthService, titleService: Title) {
        titleService.setTitle(this.title);
        this.authService.autoLogin();
    }

    ngOnInit(): void {
        this.authService.autoLogin();
    }
}
