import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, tap } from "rxjs";
import { Paginated, PaginationRequest } from "../shared/pagination/paginated.model";
import { CreateProductDto, Product } from "./product.model";

@Injectable({ providedIn: "root" })
export class ProductService {
    productSubject: Subject<Product> = new Subject<Product>();

    constructor(private http: HttpClient) {}

    getProductPage(page: PaginationRequest): Observable<Paginated<Product>> {
        return this.http.get<Paginated<Product>>(`/products?page=${page.page}&pageSize=${page.pageSize}`);
    }

    getProductPageByCategory(page: PaginationRequest, categoryId: string): Observable<Paginated<Product>> {
        return this.http.get<Paginated<Product>>(`/products?page=${page.page}&pageSize=${page.pageSize}&category=${categoryId}`);
    }

    getProductById(id: string): Observable<Product> {
        return this.http.get<Product>(`/products/${id}`);
    }

    createProduct(dto: CreateProductDto): Observable<Product> {
        return this.http.post<Product>("/products", dto).pipe(
            tap((product: Product) => this.productSubject.next(product)));
    }

    updateProduct(id: string, dto: CreateProductDto): Observable<Product> {
        return this.http.put<Product>(`/products/${id}`, dto);
    }

    deleteProduct(id: string): Observable<void> {
        return this.http.delete<void>(`/products/${id}`);
    }
}