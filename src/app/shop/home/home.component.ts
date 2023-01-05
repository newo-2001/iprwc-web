import { Component, OnDestroy, OnInit } from "@angular/core";
import { Paginated, PaginationRequest } from "src/app/shared/pagination/paginated.model";
import { OrderItem, OrderRequest } from "../order.model";
import { CartService } from "../cart.service";
import { Product } from "../product.model";
import { ProductService } from "../product.service";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";

@Component({
    selector: "shop-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, OnDestroy {
    products: Product[] = [];
    
    cart: OrderRequest = {items: []};
    cartSubscription?: Subscription;

    constructor(private productService: ProductService, private cartService: CartService, private authService: AuthService) {}

    ngOnInit(): void {
        this.loadProducts({page: 1, pageSize: 50});
        this.cartSubscription = this.cartService.cartSubject.subscribe(cart => this.cart = cart);
    }

    ngOnDestroy(): void {
        this.cartSubscription?.unsubscribe();
    }

    addToCart(item: OrderItem): void {
        const inCart = this.amountInCart(item.product)
        if (inCart + item.amount < 0) {
            item.amount = -inCart;
        }

        this.cartService.addToCart(item);
    }

    amountInCart = (product: Product): number => this.cart.items.find(item => item.product.id == product.id)?.amount ?? 0;

    loggedIn = () => this.authService.isLoggedIn();

    private loadProducts(page: PaginationRequest) {
        this.productService.getProductPage(page).subscribe((products: Paginated<Product>) => {
            this.products = this.products.concat(products.items);

            page.page++;
            if (products.page < products.totalPages) {
                this.loadProducts(page);
            }
        });
    }
}
