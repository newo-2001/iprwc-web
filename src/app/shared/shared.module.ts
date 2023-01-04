import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NavComponent } from "./nav/nav.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
    declarations: [
        NavComponent
    ],
    imports: [CommonModule, FontAwesomeModule, RouterModule],
    exports: [
        NavComponent
    ]
})
export class SharedModule { }