import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { faCircleMinus, faCirclePlus, faPencil, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { environment } from "src/environments/environment";
import { OrderItem } from "../order.model";
import { Product } from "../product.model";

@Component({
    selector: "shop-product",
    templateUrl: "./product.component.html",
    styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
    @Input() product: Product = null!;
    @Input() inCart: number = 0;
    @Input() purchasable = false;
    @Input() editable = false;

    @Output() addToCartEvent: EventEmitter<OrderItem> = new EventEmitter<OrderItem>();

    icons = { faShoppingBasket, faPencil };
    Math = Math

    constructor(private router: Router) {}

    addToCart(): void {
        this.addToCartEvent.emit({amount: 1, product: this.product});
    }

    edit(): void {
        this.router.navigate(["/products", this.product.id, "edit"]);
    }

    ngOnInit(): void {}

    getThumbnail = () => this.product.thumbnailUri ?? environment.missingThumbnailUrl;
}