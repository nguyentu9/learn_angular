import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipes.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private apiURL: string =
    'https://ng-course-recipe-book-63a85-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json';
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.apiURL, recipes).subscribe((res) => console.log(res));
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.apiURL).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
