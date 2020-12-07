/**
 * Tables follow syntax:
 * - CREATE TABLE <table_name>(<column_name> <data_type> <options>, ...)
 *
 * Create a table called `estimates` (case-insensitive), with
 * - estimate_id as an integer/number that can't have null values, auto-increment it
 * - user_id int NOT NULL
 * - job_number int NOT NULL
 * - pipe_size int NOT NULL
 * - total_num_holes int NOT NULL
 * - total_savings int NOT NULL
 * 
 *
 *
 */
exports.CREATE_ESTIMATES_TABLE = `CREATE TABLE IF NOT EXISTS estimates(
    estimate_id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    job_number int NOT NULL,
    pipe_size int NOT NULL,
    total_num_holes int NOT NULL,
    total_savings int,
    PRIMARY KEY (estimate_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
          ON UPDATE CASCADE
          ON DELETE CASCADE
  )`;

  // Get every Estiamte
exports.ALL_ESTIMATES = (userId) => `SELECT * FROM estimates WHERE user_id = ${userId}`;

// Get a single estiamte by estimateId
exports.SINGLE_ESTIMATE = (userId, estimateId) => 
  `SELECT * FROM estimates WHERE user_id = ${userId} AND estimate_id = ${estimateId}`;

/**
 * Insert follows syntax:
 * - INSERT INTO <table_name>(<col_name1>, <col_name3>, <col_name3>, ...)
 *    VALUES(<value1>, <value2>, <value3>, ...)
 *
 * Create a new estimate in `estimates` table where
 * - column names match the estimate the are in the table
 * - `?` allow us to use params in our controllers
 */
exports.INSERT_ESTIMATE = (userId, jobNumber, pipeSize, totalNumHoles) =>
  `INSERT INTO estimates (user_id, job_number, pipe_size, total_num_holes) VALUES (${userId}, ${jobNumber}, ${pipeSize}, ${totalNumHoles})`;

/**
 * Update follows syntax:
 * - UPDATE <table_name> SET <colum_name> = '<new_value>' WHERE <colum_name> = '<old_value>'
 *
 * NOTE: omitting `WHERE` will result in updating every existing entry.
 */
exports.UPDATE_ESTIMATE = (userId, estimateId, newValues) =>
  `UPDATE estimates SET ${newValues} WHERE user_id = ${userId} AND estimate_id = ${estimateId}`;

// Delete a estimates by estimateId
exports.DELETE_ESTIMATE = (userId, estimateId) =>
 `DELETE FROM estimates WHERE user_id = ${userId} AND estimate_id = ${estimateId}`;