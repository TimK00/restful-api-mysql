const con = require('../db-config');
const queries = require('../queries/users.queries');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

exports.getAllUsers = function(req, res) {
  con.query(queries.ALL_USERS, function(err, result, fields) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    res.json(result);
  });
};

// http://localhost:3000/users/1
exports.getUser = function(req, res) {
  con.query(queries.SINGLE_USERS, [req.params.userId], function(err, result) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    res.json(result);
  });
};

// http://localhost:3000/users/1
/**
 * POST request -
 * {
 *  name: 'A user name'
 * }
 */
exports.createUser = function(req, res) {
  con.query(queries.INSERT_USER, [req.body.name, req.body.lastname, req.body.password], function(err, result) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    console.log(result);
    res.json({ message: 'Number of records inserted: ' + result.affectedRows });
  });
};

// http://localhost:3000/users/1
/**
 * PUT request -
 * {
 *  name: 'A user name',
 *  state: 'completed'
 * }
 */
exports.updateUser = function(req, res) {
  con.query(
    queries.UPDATE_USER,
    [req.body.name, req.body.lastname, req.body.password, req.params.userId],
    function(err, data) {
      if (err) {
        console.log(err);
        res.send(err);
      }
      res.json(data);
    }
  );
};

// http://localhost:3000/users/1
exports.deleteUsers = function(req, res) {
  con.query(queries.DELETE_USER, [req.params.userId], function(err) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    res.json({ message: 'Deleted successfully.' });
  });
};