export interface CreateProductDto {
    name: string;
    price: number;
    description?: string;
    thumbnailUri?: string;
}