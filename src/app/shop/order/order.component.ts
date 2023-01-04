import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Order } from "../order.model";

@Component({
    selector: "shop-order",
    templateUrl: "./order.component.html",
    styleUrls: ["./order.component.scss"]
})
export class OrderComponent {
    @Input() order: Order = null!;
    @Output() cancelOrderEvent: EventEmitter<string> = new EventEmitter<string>();

    cancelOrder() {
        this.cancelOrderEvent.emit(this.order.id);
    }
}