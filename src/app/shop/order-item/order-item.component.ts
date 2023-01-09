import { Component, Input, TemplateRef } from "@angular/core";
import { environment } from "src/environments/environment";
import { OrderItem } from "../order.model";

@Component({
    selector: "shop-order-item",
    templateUrl: "./order-item.component.html",
    styleUrls: ["./order-item.component.scss"]
})
export class OrderItemComponent {
    @Input() item: OrderItem = null!;

    getThumbnail = () => this.item.product.thumbnailUri ?? environment.missingThumbnailUrl;

    totalPrice = () => this.item.amount * this.item.product.price;
}