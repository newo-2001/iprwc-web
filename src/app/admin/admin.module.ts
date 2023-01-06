import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "../shared/shared.module";
import { ShopModule } from "../shop/shop.module";
import { CreateProductComponent } from "./create-product/create-product.component";

@NgModule({
    declarations: [
        CreateProductComponent
    ],
    exports: [
        CreateProductComponent
    ],
    imports: [CommonModule, FontAwesomeModule, SharedModule, RouterModule, BrowserModule, FormsModule, ShopModule]
})
export class AdminModule {}