const controllers = require('../controllers/users.controller');
const express = require('express');

const usersRoutes = express.Router();
/**
 * Express routes for Users.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all userss. Evaluates to `/users/`.
 */
usersRoutes.get('/', controllers.getAllUsers).post('/', controllers.createUser);

/**
 * Routes for a user by id. Evalutes to `/users/:userId`.
 */
usersRoutes
  .get('/:userId', controllers.getUser) // GET http://locahost:3000/users/1
  .put('/:userId', controllers.updateUser)
  .delete('/:userId', controllers.deleteUsers);

module.exports = usersRoutes;