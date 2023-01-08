import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NavComponent } from "./nav/nav.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CategorySelectorComponent } from "./forms/category-selector/category-selector.component";
import { BrowserModule } from "@angular/platform-browser";
import { ExceptPipe } from "./except.pipe";
import { FormsModule } from "@angular/forms";
import { PricePipe } from "./price.pipe";

@NgModule({
    declarations: [
        NavComponent,
        CategorySelectorComponent,
        ExceptPipe,
        PricePipe
    ],
    imports: [CommonModule, FontAwesomeModule, RouterModule, BrowserModule, FormsModule],
    exports: [
        NavComponent,
        CategorySelectorComponent,
        ExceptPipe,
        PricePipe
    ]
})
export class SharedModule { }