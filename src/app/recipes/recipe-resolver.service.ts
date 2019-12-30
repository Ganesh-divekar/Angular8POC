import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { DatastorageService } from "./shared/datastorage.service";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RecipeService } from "./recipe.service";

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(private dtService: DatastorageService, private recipeService: RecipeService) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipeService.getRecipes();
        if (this.recipeService.getRecipes().length === 0)
            return this.dtService.fetchRecipes();
        else
            return recipes;
    }



}