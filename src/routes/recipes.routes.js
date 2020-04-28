const express = require('express');
const {
  getAllRecipes,
  createRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipes.controller');
const controllers = require('../controllers/recipes.controller');
const canAccess = require('../middleware/auth.middleware');

const recipesRoutes = express.Router();
/**
 * Express routes for Recipes.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all recipes. Evaluates to `/recipes/`.
 */
recipesRoutes.get('/', canAccess, controllers.getAllRecipes).post('/', canAccess, controllers.createRecipe);

/**
 * Routes for a recipe by id. Evalutes to `/recipes/:recipeId`.
 */
recipesRoutes
  .get('/:recipeId', canAccess, controllers.getRecipe) // GET http://locahost:3000/recipes/1
  .put('/:recipeId', canAccess, controllers.updateRecipe)
  .delete('/:recipeId', canAccess, controllers.deleteRecipe);

module.exports = recipesRoutes;