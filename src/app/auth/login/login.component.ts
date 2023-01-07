import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { LoginDto } from "./login-dto.model";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss", "../../shared/forms/form.scss"]
})
export class LoginComponent {
    constructor(private authService: AuthService, private router: Router) {}
    
    formError = "";

    login(form: NgForm): void {
        this.formError = form.invalid ? "All fields must be filled in" : "";

        if (form.invalid) return;
        const credentials = form.value as LoginDto

        this.authService.login(credentials).subscribe({
            complete: () => this.router.navigate(["/"]),
            error: response => {
                const error = response.error;
                if (error.status = 401) {
                    this.formError = "Invalid email password combination"
                }
            }
        });
    }
}