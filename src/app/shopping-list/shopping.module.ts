import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
    { path: 'shopping-list', component: ShoppingListComponent }
]
    ;
@NgModule(
    {
        declarations: [ShoppingEditComponent,
            ShoppingListComponent],
        imports: [
            SharedModule,
            FormsModule,
            ReactiveFormsModule,
            RouterModule.forChild(routes)
        ],
        exports: [
            RouterModule
        ]
    }
)
export class ShoppingModule {

}