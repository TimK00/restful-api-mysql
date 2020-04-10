const con = require('../db-config');
const queries = require('../queries/recipes.queries');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

exports.getAllRecipes = function(req, res) {
  con.query(queries.ALL_RECIPES, function(err, result, fields) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
};

// http://localhost:3000/recipes/1
exports.getRecipe = function(req, res) {
  con.query(queries.SINGLE_RECIPE, [req.params.recipeId], function(err, result) {         
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
};

// http://localhost:3000/recipes/1
/**
 * POST request -
 * {
 *  name: 'A recipe name'
 * }
 */
exports.createRecipe = function(req, res) {
  con.query(queries.INSERT_RECIPE, [req.body.name], function(err, result) {
    if (err) {
      res.send(err);
    }
    console.log(result);
    res.json({ message: 'Number of records inserted: ' + result.affectedRows });
  });
};

// http://localhost:3000/recipes/1
/**
 * PUT request -
 * {
 *  name: 'A recipe name',
 *  state: 'completed'
 * }
 */
exports.updateRecipe = function(req, res) {
  con.query(
    queries.UPDATE_RECIPE,
    [req.body.name, req.body.status, req.params.recipeId],
    function(err, data) {
      if (err) {
        res.send(err);
      }
      res.json(data);
    }
  );
};

// http://localhost:3000/recipes/1
exports.deleteRecipe = function(req, res) {
  con.query(queries.DELETE_RECIPE, [req.params.recipeId], function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Deleted successfully.' });
  });
};
