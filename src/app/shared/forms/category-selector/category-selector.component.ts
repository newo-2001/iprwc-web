import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Optional } from "src/app/shared/optional.model";
import { Category } from "../../../shop/category.model";

@Component({
    selector: "app-category-selector",
    templateUrl: "./category-selector.component.html",
    styleUrls: ["./category-selector.component.scss"]
})
export class CategorySelectorComponent {
    _categories: Category[] = []

    @Input()
    set categories(categories: Category[]) {
        this._categories = categories;

        console.log(categories, this.selectedCategory);

        if (!this.noCategory && !this.selectedCategory) {
            this.selectedCategory = categories[0];
            this.onChange(this.selectedCategory);
            return;
        }
        
        if (this.selectedCategory && !categories.some(x => x.id == this.selectedCategory?.id)) {
            this.selectedCategory = categories[0];
            this.onChange(this.selectedCategory);
        }
    }

    get categories() {
        return this._categories;
    }

    @Input() noCategory?: string;
    @Input() selectedCategory: Optional<Category>;
    @Output() selectedCategoryChange: EventEmitter<Optional<Category>> = new EventEmitter<Optional<Category>>();

    onChange(category: Optional<Category>): void {
        this.selectedCategoryChange.emit(category);
    }
}