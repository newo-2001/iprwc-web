import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { faCircleMinus, faCirclePlus, faPencil, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { environment } from "src/environments/environment";
import { Category } from "../category.model";
import { OrderItem } from "../order.model";
import { Product } from "../product.model";

@Component({
    selector: "shop-product",
    templateUrl: "./product.component.html",
    styleUrls: ["./product.component.scss", "../category-tag/category-tag.scss"]
})
export class ProductComponent implements OnInit {
    @Input() product: Product = null!;
    @Input() inCart: number = 0;
    @Input() purchasable = false;
    @Input() editable = false;
    @Input() activeCategoryFilter?: Category;

    @Output() addToCartEvent: EventEmitter<Product> = new EventEmitter<Product>();

    icons = { faShoppingBasket, faPencil };
    Math = Math

    constructor(private router: Router) {}

    addToCart(): void {
        this.addToCartEvent.emit(this.product);
    }

    edit(): void {
        this.router.navigate(["/products", this.product.id, "edit"]);
    }

    ngOnInit(): void {}

    getThumbnail = (): string => this.product.thumbnailUri ?? environment.missingThumbnailUrl;

    isActiveCategory = (category: Category): boolean => category.id == this.activeCategoryFilter?.id ?? false;
}