import { Component, OnDestroy, OnInit } from "@angular/core";
import { Paginated, PaginationRequest } from "src/app/shared/pagination/paginated.model";
import { OrderItem, OrderRequest } from "../order.model";
import { CartService } from "../cart.service";
import { Product } from "../product.model";
import { ProductService } from "../product.service";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { faCirclePlus, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Category } from "../category.model";
import { CategoryFilterPipe } from "../category-filter.pipe";
import { Optional } from "src/app/shared/optional.model";
import { CategoryService } from "../category.service";

@Component({
    selector: "shop-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
    products: Product[] = [];
    categories: Category[] = [];
    activeCategoryFilter?: Category;
    
    cart: OrderRequest = {items: []};

    icons = { faCirclePlus, faPencil };

    constructor(private productService: ProductService,
                private cartService: CartService,
                private categoryService: CategoryService,
                private authService: AuthService) {
                    this.loadProducts({page: 1, pageSize: 50});
                    this.categoryService.getAllCategories()
                        .subscribe(categories => this.categories = categories);
                }

    addToCart(item: OrderItem): void {
        const inCart = this.amountInCart(item.product)
        if (inCart + item.amount < 0) {
            item.amount = -inCart;
        }

        this.cartService.addToCart(item);
    }

    amountInCart = (product: Product): number => this.cart.items.find(item => item.product.id == product.id)?.amount ?? 0;

    isAdmin = () => this.authService.isAdmin();
    loggedIn = () => this.authService.isLoggedIn();

    filterByCategory = (category: Optional<Category>) => this.activeCategoryFilter = category ?? undefined;

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
