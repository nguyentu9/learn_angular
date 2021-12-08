import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private apiURL: string =
    'https://ng-course-recipe-book-63a85-default-rtdb.asia-southeast1.firebasedatabase.app/';
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.apiURL, recipes).subscribe((res) => console.log(res));
  }
}
