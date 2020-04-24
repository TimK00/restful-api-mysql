const connection = require('../db-config');
const {
  ALL_ARTICLES,
  SINGLE_ARTICLE,
  INSERT_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
} = require('../queries/articles.queries');
const query = require('../../utils/query');

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
  const articles = await query(con, ALL_ARTICLES).catch((err) => {
    res.send(err);
  });

  if (articles.length) {
    res.json(articles);
  }
};

// http://localhost:3000/articles/1
exports.getArticle = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query all article
  const article = await query(con, SINGLE_ARTICLE, [req.params.articleId]).catch(
    (err) => {
      res.send(err);
    }
  );

  if (article.length) {
    res.json(article);
  }
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
  const decoded = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

  // take result of middleware check
  if (decoded.id) {
    // establish connection
    const con = await connection().catch((err) => {
      throw err;
    });

    // query add article
    const result = await query(con, INSERT_ARTICLE, [req.body.article_name], [req.body.author]).catch(
      (err) => {
        res.send(err);
      }
    );
    console.log(result);

    if (result.affectedRows === 1) {
      res.json({ message: 'Added article successfully!' });
    }
  }
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

  // query update article
  const result = await query(con, UPDATE_ARTICLE, [
    req.body.article_name,
    req.body.difficulty,
    req.params.articleId,
  ]).catch((err) => {
    res.send(err);
  });

  if (result.affectedRows === 1) {
    res.json(result);
  }
};

// http://localhost:3000/articles/1
exports.deleteArticle = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query delete article
  const result = await query(con, DELETE_ARTICLE, [req.params.article_id]).catch(
    (err) => {
      res.send(err);
    }
  );

  if (result.affectedRows === 1) {
    res.json({ message: 'Deleted successfully.' });
  }
};
