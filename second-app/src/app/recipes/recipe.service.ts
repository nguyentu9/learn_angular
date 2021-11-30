import { Recipe } from './recipes.model';
export class RecipeService {
  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://static.onecms.io/wp-content/uploads/sites/44/2020/03/03/7782449.jpg'
    ),
    new Recipe(
      'Another Test Recipe',
      'This is simply a test',
      'https://static.onecms.io/wp-content/uploads/sites/44/2020/03/03/7782449.jpg'
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
