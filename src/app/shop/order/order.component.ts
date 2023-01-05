import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { faChevronDown, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Order, totalPrice } from "../order.model";

@Component({
    selector: "shop-order",
    templateUrl: "./order.component.html",
    styleUrls: ["./order.component.scss"]
})
export class OrderComponent {
    @Input() order: Order = null!;
    @Output() cancelOrderEvent: EventEmitter<Order> = new EventEmitter<Order>();
    @ViewChild("body") body: ElementRef = null!;
    
    collapsed: boolean = true;
    icons = { faTrashCan, faChevronDown };
    bodyTransition?: NodeJS.Timeout;

    cancelOrder() {
        this.cancelOrderEvent.emit(this.order);
    }

    totalPrice() {
        return totalPrice(this.order.items).toFixed(2);
    }

    // Digusting but css transitions do not work on auto values
    toggleCollapsed() {
        this.collapsed = !this.collapsed;

        const body = this.body.nativeElement;
        if (this.collapsed) {
            body.style.height = "0";
        } else {
            // Update body height to auto to force the height calculation
            body.style.height = "auto";
            const bodyHeight = getComputedStyle(body).height;
            // Reset height back to zero as this is the starting point of the transition
            body.style.height = "0";
            // Wait for the next frame to start the animation, otherwise the change will be instant
            setTimeout(() => body.style.height = bodyHeight, 1);
        }
    }
}