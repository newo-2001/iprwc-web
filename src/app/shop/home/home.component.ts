import { Component, OnInit } from "@angular/core";
import { Paginated } from "src/app/shared/pagination/paginated.model";
import { PaginationRequestDto } from "src/app/shared/pagination/pagination-request-dto.model";
import { Item } from "../cart.model";
import { CartService } from "../cart.service";
import { Product } from "../product.model";
import { ProductService } from "../product.service";

@Component({
    selector: "shop-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
    products: Product[] = [];
    page: PaginationRequestDto = {page: 1, pageSize: 3}
    allLoaded = false;

    constructor(private productService: ProductService, private cartService: CartService) {}

    ngOnInit(): void {
        this.loadProducts();
    }

    addToCart = (item: Item): void => this.cartService.addToCart(item);

    private loadProducts() {
        this.productService.getPage(this.page).subscribe((products: Paginated<Product>) => {
            this.products = this.products.concat(products.items);
            this.allLoaded = products.page == products.totalPages;
            this.page.page++;
        });
    }
}
