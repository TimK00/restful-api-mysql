/**
 * Tables follow syntax:
 * - CREATE TABLE <table_name>(<column_name> <data_type> <options>, ...)
 *
 * Create a table called `USERs` (case-insensitive), with
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
exports.CREATE_USERS_TABLE = `CREATE TABLE IF NOT EXISTS users(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    password varchar(20) NOT NULL,
    joined_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY (id)
  )`;
  
  // Get every USER
  exports.ALL_USERS = `SELECT * FROM users`;
  
  // Get a single USER by id
  exports.SINGLE_USERS = `SELECT * FROM users WHERE id = ?`;
  
  /**
   * Insert follows syntax:
   * - INSERT INTO <table_name>(<col_name1>, <col_name3>, <col_name3>, ...)
   *    VALUES(<value1>, <value2>, <value3>, ...)
   *
   * Create a new USER in `USERs` table where
   * - column names match the order the are in the table
   * - `?` allow us to use params in our controllers
   */
  exports.INSERT_USER = `INSERT INTO USERs (name, lastname, password) VALUES (?, ?, ?)`;  //Morgan, is there a better way to write this? 
  
  /**
   * Update follows syntax:
   * - UPDATE <table_name> SET <colum_name> = '<new_value>' WHERE <colum_name> = '<old_value>'
   *
   * NOTE: omitting `WHERE` will result in updating every existing entry.
   */
  exports.UPDATE_USER = `UPDATE USERs SET name = ?, lastname = ?, password = ? WHERE id = ?`;
  
  // Delete a USER by id
  exports.DELETE_USER = `DELETE FROM USERs WHERE id = ?`;