import { Pipe, PipeTransform } from "@angular/core";
import { filter } from "rxjs";
import { Category } from "./category.model";
import { Product } from "./product.model";

@Pipe({ name: "categoryFilter", pure: false })
export class CategoryFilterPipe implements PipeTransform {
    transform(values: Product[], filterBy?: Category): Product[] {
        if (!filterBy) return values;
        return values.filter(x => x.categories?.some(x => x.id == filterBy.id));
    }
}