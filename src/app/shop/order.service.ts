import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Paginated, PaginationRequest } from "../shared/pagination/paginated.model";
import { Order, OrderRequest } from "./order.model";

@Injectable({ providedIn: "root" })
export class OrderService {
    orderSubject: Subject<Order> = new Subject<Order>();

    constructor(private http: HttpClient) {}

    placeOrder = (order: OrderRequest): Observable<Order> => this.http.post<Order>("/orders", order);

    cancelOrder = (id: string): Observable<void> => this.http.delete<void>(`/orders/${id}`);

    getOrderById = (id: string): Observable<Order> => this.http.get<Order>(`/orders/${id}`);

    getOrderPage(page: PaginationRequest): Observable<Paginated<Order>> {
        return this.http.get<Paginated<Order>>(`/orders?page=${page.page}&pageSize=${page.pageSize}`);
    }
}