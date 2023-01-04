import { Component, EventEmitter, Input, Output, TemplateRef } from "@angular/core";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
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
    @Output() removeProductEvent: EventEmitter<Product> = new EventEmitter<Product>();

    icons = { faTrashCan }

    getThumbnail = () => this.item.product.thumbnailUri ?? environment.missingThumbnailUrl;

    removeItem = () => this.removeProductEvent.emit(this.item.product);
}