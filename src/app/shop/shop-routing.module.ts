import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { CartComponent } from "./cart/cart.component";
import { HomeComponent } from "./home/home.component";
import { OrdersComponent } from "./orders/orders.component";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        pathMatch: "full"
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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopRoutingModule { }
