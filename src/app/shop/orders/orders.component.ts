import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Paginated, PaginationRequest } from "src/app/shared/pagination/paginated.model";
import { Order } from "../order.model";
import { OrderService } from "../order.service";

@Component({
    selector: "shop-orders",
    templateUrl: "./orders.component.html",
    styleUrls: ["./orders.component.scss"]
})
export class OrdersComponent implements OnInit, OnDestroy {
    orders: Order[] = [];
    orderSubscription?: Subscription;

    constructor(private orderService: OrderService) {
        this.loadOrders({page: 1, pageSize: 50});
    }

    ngOnInit(): void {
        this.orderSubscription = this.orderService.orderSubject.subscribe((order: Order) => {
            this.orders.push(order);
        });
    }

    ngOnDestroy(): void {
        this.orderSubscription?.unsubscribe();
    }

    cancelOrder(order: Order) {
        this.orderService.cancelOrder(order.id).subscribe(() => {
            this.orders.splice(this.orders.indexOf(order), 1);
        });
    }

    private loadOrders(page: PaginationRequest): void {
        this.orderService.getOrderPage(page).subscribe((orders: Paginated<Order>) => {
            this.orders = this.orders.concat(orders.items);

            page.page++;
            if (orders.page < orders.totalPages) this.loadOrders(page);
        })
    }
}