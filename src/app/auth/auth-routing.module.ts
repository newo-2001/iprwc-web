import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { IsNotAuthenticatedGuard } from "./not-auth.guard";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
    {
        path: "login",
        component: LoginComponent,
        canActivate: [IsNotAuthenticatedGuard]
    },
    {
        path: "register",
        component: RegisterComponent,
        canActivate: [IsNotAuthenticatedGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
