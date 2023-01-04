import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { RegisterDto } from "./register-dto.model";

@Component({
    selector: "app-login",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss", "../../shared/forms/form.scss"]
})
export class RegisterComponent {
    constructor(private authService: AuthService, private router: Router) {}

    emailError: string = "";
    passwordError: string = "";

    register(form: NgForm): void {
        this.emailError = form.controls["email"]?.valid ? "" : "Invalid email address";

        const { password, confirmPassword } = form.value;
        
        this.passwordError = password ? "" : "Password field can't be empty";
        if (password != confirmPassword) {
            this.passwordError = "Passwords don't match";
        }

        if (form.invalid) return;

        const credentials = form.value as RegisterDto;
        this.authService.register(credentials).subscribe({
            complete: () => this.router.navigate(["/"]),
            error: response => {
                this.emailError = response.error.reason;
            }
        });
    }

    clearErrors() {
        this.emailError = "";
        this.passwordError = "";
    }
}