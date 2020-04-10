const express = require('express');
const controllers = require('../controllers/recipes.controller');

const recipesRoutes = express.Router();
/**
 * Express routes for Recipes.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all recipes. Evaluates to `/recipes/`.
 */
recipesRoutes.get('/', controllers.getAllRecipes).post('/', controllers.createRecipe);

/**
 * Routes for a recipe by id. Evalutes to `/recipes/:recipeId`.
 */
recipesRoutes
  .get('/:recipeId', controllers.getRecipe) // GET http://locahost:3000/recipes/1
  .put('/:recipeId', controllers.updateRecipe)
  .delete('/:recipeId', controllers.deleteRecipe);

module.exports = recipesRoutes;