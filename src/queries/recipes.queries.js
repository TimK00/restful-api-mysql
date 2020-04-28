/**
 * Tables follow syntax:
 * - CREATE TABLE <table_name>(<column_name> <data_type> <options>, ...)
 *
 * Create a table called `recipes` (case-insensitive), with
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
exports.CREATE_RECIPES_TABLE = `CREATE TABLE IF NOT EXISTS recipes(
    recipe_id int NOT NULL AUTO_INCREMENT,
    recipe_name varchar(255) NOT NULL,
    difficulty varchar(10) DEFAULT 'easy',
    PRIMARY KEY (recipe_id)
  )`;
  
  // Get every recipe
  exports.ALL_RECIPES = `SELECT * FROM recipes`;
  
  // Get a single recipe by id
  exports.SINGLE_RECIPE = `SELECT * FROM recipes WHERE recipe_id = ?`;
  
  /**
   * Insert follows syntax:
   * - INSERT INTO <table_name>(<col_name1>, <col_name3>, <col_name3>, ...)
   *    VALUES(<value1>, <value2>, <value3>, ...)
   *
   * Create a new recipe in `recipes` table where
   * - column names match the order the are in the table
   * - `?` allow us to use params in our controllers
   */
  exports.INSERT_RECIPE = `INSERT INTO recipes (recipe_name, difficulty) VALUES (?, ?)`;
  
  /**
   * Update follows syntax:
   * - UPDATE <table_name> SET <colum_name> = '<new_value>' WHERE <colum_name> = '<old_value>'
   *
   * NOTE: omitting `WHERE` will result in updating every existing entry.
   */
  exports.UPDATE_RECIPE = `UPDATE recipes SET recipe_name = ?, difficulty = ? WHERE id = ?`;
  
  // Delete a recipe by id
  exports.DELETE_RECIPE = `DELETE FROM recipes WHERE id = ?`;
  