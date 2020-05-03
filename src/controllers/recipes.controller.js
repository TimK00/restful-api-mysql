const mysql = require('mysql');
const connection = require('../db-config');
const {
  ALL_RECIPES,
  SINGLE_RECIPE,
  INSERT_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
} = require('../queries/recipes.queries');
const query = require('../../utils/query');
const { serverError } = require('../../utils/handlers');

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
  const recipes = await query(con, ALL_RECIPES(req.user.id), []).catch(
    serverError(res)
  );

  // [] === true, 0 === false
  if (!recipes.length) {
    res.status(200).json({ msg: 'No recipes available for this user.' });
  }
  res.json(recipes);
};

// http://localhost:3000/recipes/1
exports.getRecipe = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query all recipe
  const recipe = await query(
    con,
    SINGLE_RECIPE(req.user.id, req.params.recipeId)
  ).catch(serverError(res));

  if (!recipe.length) {
    res.status(400).json({ msg: 'No recipes available for this user.' });
  }
  res.json(recipe);
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
  const user = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

  // take result of middleware check
  if (user.id) {
    // establish connection
    const con = await connection().catch((err) => {
      throw err;
    });

    // query add recipe
    const recipeName = mysql.escape(req.body.recipe_name);
    const difficulty = mysql.escape(req.body.difficulty);
    const result = await query(con, INSERT_RECIPE(user.id, recipeName, difficulty)).catch(
      serverError(res)
    );

    if (result.affectedRows !== 1) {
      res
        .status(500)
        .json({ msg: `Unable to add recipe: ${req.body.recipe_name}` });
    }
    res.json({ msg: 'Added recipe successfully!' });
  }
};

/**
 * Build up values string.
 *
 * @example
 * 'key1 = value1, key2 = value2, ...'
 * "recipe_name = \'Recipe 1\', status = \'complete\', date = \'<today's_date>\'"
 */
const _buildValuesString = (req) => {
  const body = req.body;
  const values = Object.keys(body).map(
    // [recipe_name, status].map()
    (key) => `${key} = ${mysql.escape(body[key])}` // 'New 1 recipe name'
  );

  values.push(`created_date = NOW()`); // update current date and time
  values.join(', '); // make into a string
  return values;
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
  const values = _buildValuesString(req);

  // query update recipe
  const result = await query(
    con,
    UPDATE_RECIPE(req.user.id, req.params.recipeId, values)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
      .status(500)
      .json({ msg: `Unable to update recipe: '${req.body.recipe_name}'` });
  }
  res.json(result);
};

// http://localhost:3000/recipes/1
exports.deleteRecipe = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query delete recipe
  const result = await query(
    con,
    DELETE_RECIPE(req.user.id, req.params.recipeId)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
      .status(500)
      .json({ msg: `Unable to delete recipe at: ${req.params.recipeId}` });
  }
  res.json({ msg: 'Deleted successfully.' });
};