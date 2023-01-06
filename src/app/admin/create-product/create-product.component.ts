import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Optional } from "src/app/shared/optional.model";
import { Category } from "src/app/shop/category.model";
import { CategoryService } from "src/app/shop/category.service";
import { Product } from "src/app/shop/product.model";
import { ProductService } from "src/app/shop/product.service";

@Component({
    selector: "admin-create-product",
    templateUrl: "./create-product.component.html",
    styleUrls: ["./create-product.component.scss", "../../shared/forms/form.scss", "../../shop/category-tag/category-tag.scss"]
})
export class CreateProductComponent {
    product: Partial<Product> = { categories: []};
    categories: Category[] = [];
    selectedCategory: Optional<Category>;
    formError: string = "";

    icons = { faTrashCan, faPlus };

    constructor(private productService: ProductService,
                private activatedRoute: ActivatedRoute,
                private categoryService: CategoryService,
                private router: Router) {
        activatedRoute.params.subscribe(params => {
            const id: string = params["id"] as string;
            if (!id) return;
            
            productService.getProductById(id).subscribe(product => { 
                this.product = product;
                this.product.price! /= 100;
            });
        });

        this.categoryService.getAllCategories()
            .subscribe(categories => this.categories = categories);
    }

    submit(form: NgForm) {
        this.formError = form.controls["name"].valid ? "" : "Name is a required field";
        if (form.invalid) return;

        const dto = {
            name: form.value.name,
            description: form.value.description,
            price: form.value.price,
            thumbnailUri: form.value.thumbnailUri,
            categories: this.product.categories?.map(x => x.id) ?? []
        }

        dto.price = Math.floor(dto.price * 100)

        const action = this.product.id
            ? this.productService.updateProduct(this.product.id, dto)
            : this.productService.createProduct(dto);

        action.subscribe({
            complete: () => this.router.navigate(["/"]),
            error: result => {
                this.formError = result.error.reason;
            }
        });
    }

    deleteProduct(): void {
        this.productService.deleteProduct(this.product.id!).subscribe({
            complete: () => this.router.navigate(["/"]),
            error: result => this.formError = result.error.reason
        });
    }

    addCategory(category?: Category): void {
        if (!category) return;
        this.product.categories?.push(category);
    }

    removeCategory(category: Category): void {
        this.product.categories?.splice(this.product.categories?.findIndex(x => x.id == category.id), 1);
    }

    productIsNotInCategory(category: Category): boolean {
        return !this.product.categories?.some(x => x.id == category.id) ?? true;
    }
}