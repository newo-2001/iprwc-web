import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { faCircleMinus, faCirclePlus, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { Item } from "../cart.model";
import { Product } from "../product.model";

@Component({
    selector: "shop-product",
    templateUrl: "./product.component.html",
    styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
    @Input() product: Product = null!;
    @Output() addToCartEvent = new EventEmitter<Item>();

    amount: number = 1;

    icons = { faShoppingBasket, faCirclePlus, faCircleMinus };

    constructor() {}

    addToCart(): void {
        const item: Item = { amount: this.amount, product: this.product }
        console.log(item);
        this.addToCartEvent.emit(item);
    }

    ngOnInit(): void {}

    increment() {
        this.amount++;
    }

    decrement() {
        this.amount = Math.max(this.amount - 1, 1);
    }
}