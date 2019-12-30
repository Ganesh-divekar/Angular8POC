import { Injectable } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Observable } from 'rxjs';
import { map, tap, exhaustMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DatastorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  saveRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    return this.http.put('https://recipe-15d6f.firebaseio.com/recipe.json', recipes);
  }

  fetchRecipes() {

    return this.http.get<Recipe[]>('https://recipe-15d6f.firebaseio.com/recipe.json')
      .pipe(map(recipes => {
        return recipes.map(
          recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
      }),
        tap(response => {
          this.recipeService.setRecipe(response);
        }));

  }
}
