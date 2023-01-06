import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "../shared/shared.module";
import { ShopModule } from "../shop/shop.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { CreateProductComponent } from "./create-product/create-product.component";
import { EditCategoriesComponent } from "./edit-categories-component/edit-categories.component";

@NgModule({
    declarations: [
        CreateProductComponent,
        EditCategoriesComponent
    ],
    exports: [
        CreateProductComponent,
        EditCategoriesComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        SharedModule,
        RouterModule,
        BrowserModule,
        FormsModule,
        ShopModule,
        AdminRoutingModule
    ]
})
export class AdminModule {}