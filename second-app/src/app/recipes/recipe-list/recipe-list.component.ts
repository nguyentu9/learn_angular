import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://static.onecms.io/wp-content/uploads/sites/44/2020/03/03/7782449.jpg'
    ),
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://static.onecms.io/wp-content/uploads/sites/44/2020/03/03/7782449.jpg'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}
}
