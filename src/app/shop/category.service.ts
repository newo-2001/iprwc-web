import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category, CreateCategoryDto } from "./category.model";

@Injectable({ providedIn: "root" })
export class CategoryService {
    constructor(private http: HttpClient) {}

    getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>("/categories");
    }

    deleteCategory(categoryId: string): Observable<void> {
        return this.http.delete<void>(`/categories/${categoryId}`);
    }

    createCategory(category: CreateCategoryDto): Observable<Category> {
        return this.http.post<Category>("/categories", category);
    }

    getCategoryById(categoryId: string): Observable<Category> {
        return this.http.get<Category>(`/categories/${categoryId}`);
    }

    updateCategory(categoryId: string, category: CreateCategoryDto): Observable<Category> {
        return this.http.put<Category>(`/categories/${categoryId}`, category);
    }
}