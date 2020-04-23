const connection = require('../db-config');
const {
  ALL_RECIPES,
  SINGLE_RECIPE,
  INSERT_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
} = require('../queries/recipes.queries');
const query = require('../../utils/query');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

// http://localhost:3000/recipes
exports.getAllRecipes = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query all recipes
  const recipes = await query(con, ALL_RECIPES).catch((err) => {
    res.send(err);
  });

  if (recipes.length) {
    res.json(recipes);
  }
};

// http://localhost:3000/recipes/1
exports.getRecipe = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query all recipe
  const recipe = await query(con, SINGLE_RECIPE, [req.params.recipeId]).catch(
    (err) => {
      res.send(err);
    }
  );

  if (recipe.length) {
    res.json(recipe);
  }
};

// http://localhost:3000/recipes
/**
 * POST request -
 * {
 *  name: 'A recipe name'
 * }
 */
exports.createRecipe = async (req, res) => {
  // verify valid token
  const decoded = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

  // take result of middleware check
  if (decoded.id) {
    // establish connection
    const con = await connection().catch((err) => {
      throw err;
    });

    // query add recipe
    const result = await query(con, INSERT_RECIPE, [req.body.recipe_name]).catch(
      (err) => {
        res.send(err);
      }
    );
    console.log(result);

    if (result.affectedRows === 1) {
      res.json({ message: 'Added recipe successfully!' });
    }
  }
};

// http://localhost:3000/recipes/1
/**
 * PUT request -
 * {
 *  name: 'A recipe name',
 *  state: 'completed'
 * }
 */
exports.updateRecipe = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query update recipe
  const result = await query(con, UPDATE_RECIPE, [
    req.body.recipe_name,
    req.body.difficulty,
    req.params.recipeId,
  ]).catch((err) => {
    res.send(err);
  });

  if (result.affectedRows === 1) {
    res.json(result);
  }
};

// http://localhost:3000/recipes/1
exports.deleteRecipe = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query delete recipe
  const result = await query(con, DELETE_RECIPE, [req.params.recipe_id]).catch(
    (err) => {
      res.send(err);
    }
  );

  if (result.affectedRows === 1) {
    res.json({ message: 'Deleted successfully.' });
  }
};
