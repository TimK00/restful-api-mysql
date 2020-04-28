const express = require('express');
const {
  getAllArticles,
  createArticle,
  getArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/articles.controller');
const controllers = require('../controllers/articles.controller');
const canAccess = require('../middleware/auth.middleware');

const articlesRoutes = express.Router();
/**
 * Express routes for Articles.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all articles. Evaluates to `/articles/`.
 */
articlesRoutes.get('/', canAccess, controllers.getAllArticles).post('/', canAccess, controllers.createArticle);

/**
 * Routes for a article by id. Evalutes to `/articles/:articleId`.
 */
articlesRoutes
  .get('/:articleId', canAccess, controllers.getArticle) // GET http://locahost:3000/articles/1
  .put('/:articleId', canAccess, controllers.updateArticle)
  .delete('/:articleId', canAccess, controllers.deleteArticle);

module.exports = articlesRoutes;