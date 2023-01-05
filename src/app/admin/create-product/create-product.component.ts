import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { CreateProductDto, Product } from "src/app/shop/product.model";
import { ProductService } from "src/app/shop/product.service";

@Component({
    selector: "admin-create-product",
    templateUrl: "./create-product.component.html",
    styleUrls: ["./create-product.component.scss", "../../shared/forms/form.scss"]
})
export class CreateProductComponent {
    product: Partial<Product> = {};
    formError: string = "";

    icons = { faTrashCan };

    constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router) {
        activatedRoute.params.subscribe(params => {
            const id: string = params["id"] as string;
            
            productService.getProductById(id).subscribe(product => { 
                this.product = product;
                this.product.price! /= 100;
            });
        });
    }

    submit(form: NgForm) {
        this.formError = form.controls["name"].valid ? "" : "Name is a required field";
        if (form.invalid) return;

        const dto = form.value as CreateProductDto;
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
}