import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateProductComponent } from "./admin/create-product/create-product.component";
import { AdminGuard } from "./auth/admin.guard";
import { AuthGuard } from "./auth/auth.guard";
import { LoginComponent } from "./auth/login/login.component";
import { IsNotAuthenticatedGuard } from "./auth/not-auth.guard";
import { RegisterComponent } from "./auth/register/register.component";
import { CartComponent } from "./shop/cart/cart.component";
import { HomeComponent } from "./shop/home/home.component";
import { OrdersComponent } from "./shop/orders/orders.component";

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
        component: RegisterComponent,
        canActivate: [IsNotAuthenticatedGuard]
    },
    {
        path: "cart",
        component: CartComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "orders",
        component: OrdersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "products/:id/edit",
        component: CreateProductComponent,
        canActivate: [AdminGuard]
    },
    {
        path: "products/create",
        component: CreateProductComponent,
        canActivate: [AdminGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
