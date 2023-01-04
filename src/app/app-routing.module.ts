import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { IsNotAuthenticatedGuard } from "./auth/not-auth.guard";
import { RegisterComponent } from "./auth/register/register.component";
import { HomeComponent } from "./shop/home/home.component";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        pathMatch: "full"
    },
    {
        path: "login",
        component: LoginComponent,
        canActivate: [IsNotAuthenticatedGuard]
    },
    {
        path: "register",
        component: RegisterComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
