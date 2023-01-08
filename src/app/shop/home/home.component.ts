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
export class HomeComponent implements OnInit, OnDestroy {
    products: Product[] = [];
    categories: Category[] = [];
    activeCategoryFilter?: Category;
    
    cart: OrderRequest = {items: []};
    cartSubscription?: Subscription;

    icons = { faCirclePlus, faPencil };

    constructor(private productService: ProductService,
                private cartService: CartService,
                private categoryService: CategoryService,
                private authService: AuthService) {
                    this.loadProducts({page: 1, pageSize: 50});
                    this.categoryService.getAllCategories()
                        .subscribe(categories => this.categories = categories);
                }
    
    ngOnInit(): void {
        this.cartSubscription = this.cartService.cartSubject.subscribe(cart => this.cart = cart);
    }

    ngOnDestroy(): void {
        this.cartSubscription?.unsubscribe();
    }

    addToCart(product: Product): void {
        this.cartService.addToCart({product, amount: 1});
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
