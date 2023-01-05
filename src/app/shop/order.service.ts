import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, Subject, tap } from "rxjs";
import { Paginated, PaginationRequest } from "../shared/pagination/paginated.model";
import { Order, OrderItem, OrderRequest } from "./order.model";

@Injectable({ providedIn: "root" })
export class OrderService {
    orderSubject: Subject<Order> = new Subject<Order>();

    constructor(private http: HttpClient) {}

    placeOrder(order: OrderRequest): Observable<Order> {
        const orderDto = {items: order.items.map(item => {
            return {amount: item.amount, productId: item.product.id}
        })};

        return this.http.post<OrderResponse>("/orders", orderDto).pipe(
            map((res: OrderResponse) => this.orderFromResponse(res)),
            tap((order: Order) => this.orderSubject.next(order)));
    }

    cancelOrder(id: string): Observable<void> {
        return this.http.delete<void>(`/orders/${id}`);
    }

    getOrderById = (id: string): Observable<Order> => this.http.get<OrderResponse>(`/orders/${id}`).pipe(
        map((res: OrderResponse) => this.orderFromResponse(res)))

    getOrderPage(page: PaginationRequest): Observable<Paginated<Order>> {
        return this.http.get<Paginated<OrderResponse>>(`/orders?page=${page.page}&pageSize=${page.pageSize}`).pipe(
            map((res: Paginated<OrderResponse>) => this.ordersFromPaginatedResponse(res)));
    }

    private ordersFromPaginatedResponse(response: Paginated<OrderResponse>): Paginated<Order> {
        return {
            items: response.items.map(this.orderFromResponse),
            page: response.page,
            pageSize: response.pageSize,
            totalPages: response.totalPages
        }
    }

    private orderFromResponse(response: OrderResponse): Order {
        return {
            items: response.items,
            userId: response.userId,
            orderTime: new Date(response.orderTime),
            id: response.id
        };
    }
}

interface OrderResponse {
    items: OrderItem[];
    userId: string;
    orderTime: string;
    id: string;
}