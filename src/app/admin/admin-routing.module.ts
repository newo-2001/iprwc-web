import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "../auth/admin.guard";
import { CreateProductComponent } from "./create-product/create-product.component";
import { EditCategoriesComponent } from "./edit-categories-component/edit-categories.component";

const routes: Routes = [
    {
        path: "products/:id/edit",
        component: CreateProductComponent,
        canActivate: [AdminGuard]
    },
    {
        path: "products/create",
        component: CreateProductComponent,
        canActivate: [AdminGuard]
    },
    {
        path: "categories/edit",
        component: EditCategoriesComponent,
        canActivate: [AdminGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
