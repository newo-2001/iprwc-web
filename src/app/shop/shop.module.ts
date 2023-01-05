import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "../shared/shared.module";
import { CartItemComponent } from "./cart-item/cart-item.component";
import { CartComponent } from "./cart/cart.component";
import { HomeComponent } from './home/home.component';
import { OrderItemComponent } from "./order-item/order-item.component";
import { OrderComponent } from "./order/order.component";
import { OrdersComponent } from "./orders/orders.component";
import { ProductComponent } from "./product/product.component";

@NgModule({
    declarations: [
        HomeComponent,
        ProductComponent,
        CartComponent,
        CartItemComponent,
        OrderComponent,
        OrdersComponent,
        OrderItemComponent
    ],
    exports: [
        HomeComponent,
        ProductComponent,
        CartComponent,
        CartItemComponent,
        OrderComponent,
        OrdersComponent,
        OrderItemComponent
    ],
    imports: [CommonModule, FontAwesomeModule, SharedModule, RouterModule, BrowserModule]
})
export class ShopModule {}