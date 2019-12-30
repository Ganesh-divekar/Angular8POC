import { NgModule } from "@angular/core";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { Routes, Router, RouterModule } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { RecipesResolverService } from "./recipe-resolver.service";
import { AuthGuard } from "../auth/auth.guard";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
    {
        path: '', component: RecipesComponent, canActivate: [AuthGuard], children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] }]
    }
];
@NgModule({
    declarations: [
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
        RecipesComponent,
        RecipeListComponent

    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [
        RouterModule
    ]
})
export class RecipeModule {

}