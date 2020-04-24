/**
 * Tables follow syntax:
 * - CREATE TABLE <table_name>(<column_name> <data_type> <options>, ...)
 *
 * Create a table called `articles` (case-insensitive), with
 * - id as an integer/number that can't have null values, auto-increment it
 * - name with a max of 255 characters, cannot have null values
 * - created_date set to date and time created
 * - status with a max of 10 characters, has a default of 'pending'
 *
 * NOTE: order is important.
 * - columns can have multiple options attached (take `id` column for example)
 * - id is always first (helps with inserting)
 * - defaults always specifed last (helps with inserting)
 */
exports.CREATE_ARTICLES_TABLE = `CREATE TABLE IF NOT EXISTS articles(
    article_id int NOT NULL AUTO_INCREMENT,
    article_name varchar(255) NOT NULL,
    author varchar(255) DEFAULT 'easy',
    PRIMARY KEY (article_id)
  )`;
  
  // Get every article
  exports.ALL_ARTICLES = `SELECT * FROM articles`;
  
  // Get a single article by id
  exports.SINGLE_ARTICLE = `SELECT * FROM articles WHERE article_id = ?`;
  
  /**
   * Insert follows syntax:
   * - INSERT INTO <table_name>(<col_name1>, <col_name3>, <col_name3>, ...)
   *    VALUES(<value1>, <value2>, <value3>, ...)
   *
   * Create a new article in `articles` table where
   * - column names match the order the are in the table
   * - `?` allow us to use params in our controllers
   */
  exports.INSERT_ARTICLE = `INSERT INTO articles (article_name) VALUES (?)`;
  
  /**
   * Update follows syntax:
   * - UPDATE <table_name> SET <colum_name> = '<new_value>' WHERE <colum_name> = '<old_value>'
   *
   * NOTE: omitting `WHERE` will result in updating every existing entry.
   */
  exports.UPDATE_ARTICLE = `UPDATE articles SET article_name = ?, author = ? WHERE id = ?`;
  
  // Delete a article by id
  exports.DELETE_ARTICLE = `DELETE FROM articles WHERE id = ?`;
  