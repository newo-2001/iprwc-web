import { Component, EventEmitter, Input, Output, TemplateRef } from "@angular/core";
import { faCircleMinus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { environment } from "src/environments/environment";
import { OrderItem } from "../order.model";
import { Product } from "../product.model";

@Component({
    selector: "shop-cart-item",
    templateUrl: "./cart-item.component.html",
    styleUrls: ["./cart-item.component.scss", "../order-item/order-item.component.scss"]
})
export class CartItemComponent {
    @Input() item: OrderItem = null!;
    @Output() removeProductEvent: EventEmitter<OrderItem> = new EventEmitter<OrderItem>();

    icons = { faTrashCan, faCircleMinus }

    getThumbnail = () => this.item.product.thumbnailUri ?? environment.missingThumbnailUrl;

    removeItem(amount: number) {
        this.removeProductEvent.emit({amount: amount, product: this.item.product});
    }
}