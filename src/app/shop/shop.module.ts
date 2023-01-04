import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "../shared/shared.module";
import { CartComponent } from "./cart/cart.component";
import { HomeComponent } from './home/home.component';
import { ProductComponent } from "./product/product.component";

@NgModule({
    declarations: [
        HomeComponent,
        ProductComponent,
        CartComponent
    ],
    exports: [
        HomeComponent,
        ProductComponent,
        CartComponent
    ],
    imports: [CommonModule, FontAwesomeModule, SharedModule, RouterModule]
})
export class ShopModule {}