import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipes.model';

@Injectable()
export class RecipeService {
  public recipeSelected = new Subject<Recipe>();
  public recipeChanged = new Subject<Recipe[]>();

  //   private recipes: Recipe[] = [
  //     new Recipe(
  //       'Tasty Schnitzel',
  //       'A super-tasty Schnitzel - just awesome!',
  //       'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //       [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
  //     ),
  //     new Recipe(
  //       'Big Fat Burger',
  //       'What else you need to say?',
  //       'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //       [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
  //     ),
  //   ];

  private recipes: Recipe[] = [];

  constructor(private shoppingListServicce: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  addRecipeToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListServicce.addIngredients(ingredients);
  }
}
