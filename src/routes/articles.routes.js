const express = require('express');
const {
  getAllArticles,
  createArticle,
  getArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/articles.controller');
const controllers = require('../controllers/articles.controller');

const articlesRoutes = express.Router();
/**
 * Express routes for Articles.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all articles. Evaluates to `/articles/`.
 */
articlesRoutes.get('/', controllers.getAllArticles).post('/', controllers.createArticle);

/**
 * Routes for a article by id. Evalutes to `/articles/:articleId`.
 */
articlesRoutes
  .get('/:articleId', controllers.getArticle) // GET http://locahost:3000/articles/1
  .put('/:articleId', controllers.updateArticle)
  .delete('/:articleId', controllers.deleteArticle);

module.exports = articlesRoutes;