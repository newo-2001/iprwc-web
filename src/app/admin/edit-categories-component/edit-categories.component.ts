import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Optional } from "src/app/shared/optional.model";
import { Category, CreateCategoryDto } from "src/app/shop/category.model";
import { CategoryService } from "src/app/shop/category.service";

@Component({
    selector: "admin-edit-categories",
    templateUrl: "./edit-categories.component.html",
    styleUrls: ["./edit-categories.component.scss", "../../shared/forms/form.scss"]
})
export class EditCategoriesComponent {
    categories: Category[] = [];
    selectedCategory: Optional<Category>;
    formError: string = "";

    category: CreateCategoryDto = { name: ""};

    icons = { faTrashCan };

    constructor(private categoryService: CategoryService) {
        categoryService.getAllCategories()
            .subscribe(categories => this.categories = categories);
    }

    submit(): void {
        this.formError = this.category.name ? "" : "A category must have name"
        if (this.formError) return;

        const subscription = this.selectedCategory
            ? this.categoryService.updateCategory(this.selectedCategory.id, this.category)
            : this.categoryService.createCategory(this.category);
        
        subscription.subscribe({
            next: (category: Category) => {
                if (this.selectedCategory) {
                    const index = this.categories.findIndex(x => x.id == this.selectedCategory!.id);
                    this.categories[index] = category;
                } else {
                    this.categories.push(category);
                }
                
                this.selectedCategory = category;
            },
            error: result => this.formError = result.error.reason
        });
    }

    categoryChange(category: Optional<Category>): void {
        if (!category) {
            this.category = { name: ""};
            return;
        }

        this.category = { ...category };
    }

    deleteCategory(category: Optional<Category>): void {
        if (!category) return;
        
        this.categoryService.deleteCategory(category.id).subscribe({
            next: () => {
                this.categories.splice(this.categories.indexOf(category), 1);
                this.selectedCategory = undefined;
            },
            error: response => this.formError = response.error.reason
        })
    }
}