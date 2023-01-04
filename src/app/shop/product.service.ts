import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Paginated } from "../shared/pagination/paginated.model";
import { PaginationRequestDto } from "../shared/pagination/pagination-request-dto.model";
import { CreateProductDto } from "./admin/create-product-dto.model";
import { Product } from "./product.model";

@Injectable({ providedIn: "root" })
export class ProductService {
    productSubject: Subject<Product> = new Subject<Product>();

    constructor(private http: HttpClient) {}

    getPage(page: PaginationRequestDto): Observable<Paginated<Product>> {
        return this.http.get<Paginated<Product>>(`/products?page=${page.page}&pageSize=${page.pageSize}`);
    }

    getById(id: string): Observable<Product> {
        return this.http.get<Product>(`/product/${id}`);
    }

    create(dto: CreateProductDto): Observable<Product> {
        return this.http.post<Product>("/products", dto);
    }

    update(id: string, dto: CreateProductDto): Observable<Product> {
        return this.http.put<Product>(`/products/${id}`, dto);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`/products/${id}`);
    }
}