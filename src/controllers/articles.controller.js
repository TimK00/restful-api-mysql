const mysql = require('mysql');
const connection = require('../db-config');
const {
  ALL_ARTICLES,
  SINGLE_ARTICLE,
  INSERT_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
} = require('../queries/articles.queries');
const query = require('../../utils/query');
const { serverError } = require('../../utils/handlers');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

// http://localhost:3000/articles
exports.getAllArticles = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query all articles
  const articles = await query(con, ALL_ARTICLES(req.user.id), []).catch(
    serverError(res)
  );

  // [] === true, 0 === false
  if (!articles.length) {
    res.status(200).json({ msg: 'No articles available for this user.' });
  }
  res.json(articles);
};

// http://localhost:3000/articles/1
exports.getArticle = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query all article
  const article = await query(
    con,
    SINGLE_ARTICLE(req.user.id, req.params.articleId)
  ).catch(serverError(res));

  if (!article.length) {
    res.status(400).json({ msg: 'No articles available for this user.' });
  }
  res.json(article);
};

// http://localhost:3000/articles
/**
 * POST request -
 * {
 *  name: 'A article name'
 * }
 */
exports.createArticle = async (req, res) => {
  // verify valid token
  const user = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

  // take result of middleware check
  if (user.id) {
    // establish connection
    const con = await connection().catch((err) => {
      throw err;
    });

    // query add article
    const articleName = mysql.escape(req.body.article_name);
    const author = mysql.escape(req.body.author);
    const result = await query(con, INSERT_ARTICLE(user.id, articleName, author)).catch(
      serverError(res)
    );

    if (result.affectedRows !== 1) {
      res
        .status(500)
        .json({ msg: `Unable to add article: ${req.body.article_name}` });
    }
    res.json({ msg: 'Added article successfully!' });
  }
};

/**
 * Build up values string.
 *
 * @example
 * 'key1 = value1, key2 = value2, ...'
 * "article_name = \'Article 1\', status = \'complete\', date = \'<today's_date>\'"
 */
const _buildValuesString = (req) => {
  const body = req.body;
  const values = Object.keys(body).map(
    // [article_name, status].map()
    (key) => `${key} = ${mysql.escape(body[key])}` // 'New 1 article name'
  );

  values.push(`created_date = NOW()`); // update current date and time
  values.join(', '); // make into a string
  return values;
};

// http://localhost:3000/articles/1
/**
 * PUT request -
 * {
 *  name: 'A article name',
 *  state: 'completed'
 * }
 */
exports.updateArticle = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });
  const values = _buildValuesString(req);

  // query update article
  const result = await query(
    con,
    UPDATE_ARTICLE(req.user.id, req.params.articleId, values)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
      .status(500)
      .json({ msg: `Unable to update article: '${req.body.article_name}'` });
  }
  res.json(result);
};

// http://localhost:3000/articles/1
exports.deleteArticle = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query delete article
  const result = await query(
    con,
    DELETE_ARTICLE(req.user.id, req.params.articleId)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
      .status(500)
      .json({ msg: `Unable to delete article at: ${req.params.articleId}` });
  }
  res.json({ msg: 'Deleted successfully.' });
};