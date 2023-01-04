import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { faCircleMinus, faCirclePlus, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
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

    @Output() addToCartEvent: EventEmitter<OrderItem> = new EventEmitter<OrderItem>();

    amount: number = 1;

    icons = { faShoppingBasket, faCirclePlus, faCircleMinus };
    Math = Math

    constructor() {}

    addToCart(): void {
        const item: OrderItem = { amount: this.amount, product: this.product }
        console.log(item);
        this.addToCartEvent.emit(item);
    }

    ngOnInit(): void {}

    increment() {
        this.amount++;
        if (this.amount == 0) this.amount = 1;
    }

    decrement() {
        this.amount--;
        if (this.amount == 0) this.amount = -1;
    }

    getThumbnail = () => this.product.thumbnailUri ?? environment.missingThumbnailUrl;
}