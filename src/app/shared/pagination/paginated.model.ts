export interface Paginated<T> {
    items: T[];
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface PaginationRequest {
    page: number;
    pageSize: number;
}