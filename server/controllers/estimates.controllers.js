const mysql = require('mysql');
const connection = require('../db-config');
const {
  ALL_ESTIMATES,
  SINGLE_ESTIMATE,
  INSERT_ESTIMATE,
  UPDATE_ESTIMATE,
  DELETE_ESTIMATE,
} = require('../queries/estimates.queries');
const query = require('../utils/query');
const { serverError } = require('../utils/handlers');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

 // http://localhost:3000/estimates
 exports.getAllEstimates = async (req, res) => {
    // establish connection
    const con = await connection().catch((err) => {
      throw err;
    });
  
    // query all estiamtes
    const estiamtes = await query(con, ALL_ESTIMATES(req.user.id), []).catch(
      serverError(res)
    );
  
    // [] === true, 0 === false
    if (!estiamtes.length) {
      return res.status(200).json({ msg: 'No estimates available for this user.' });
    }
    res.json(estiamtes);
  };

// http://localhost:3000/estimates/1
exports.getEstimate = async (req, res) => {
    // establish connection
    const con = await connection().catch((err) => {
      throw err;
    });
  
    // query estimate
    const estimate = await query(
      con,
      SINGLE_ESTIMATE(req.user.id, req.params.estimateId)).catch(serverError(res));
  
    if (!estimate.length) {
      res.status(400).json({ msg: 'No estimate available for this user.' });
    }
    res.json(estimate);
};

// http://localhost:3000/estimates
/**
 * POST request -
 * {
 *  job_number  :   'A job number'
 *  pipe_size   :   'Pipe size'
 *  total_num_holes :   'Total number of holes'
 * 
 * }
 */

exports.createEstimate = async (req, res) => {
    // verify valid token
    const user = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }
  
     // take result of middleware check
     if (user.id) {
      // establish connection
      const con = await connection().catch((err) => {
        throw err;
      });
  
      // query add estimate
      const jobNumber = mysql.escape(req.body.job_number);
      const pipeSize = mysql.escape(req.body.pipe_size);
      const totalNumHoles = mysql.escape(req.body.total_num_holes);
      const totalSavings = mysql.escape(req.body.total_savings);
      const result = await query(con, INSERT_ESTIMATE(user.id, jobNumber, pipeSize, totalNumHoles, totalSavings)).catch(
        serverError(res)
      );
  
      if (result.affectedRows !== 1) {
        res
          .status(500)
          .json({ msg: `Unable to add estiamte: ${req.body.job_number} ${req.body.pipe_size} ${req.body.total_num_holes} ${req.body.total_savings}` });
      }
      res.json({msg: 'Added estimate successfully!' });
    }
  };
  

  /**
 * Build up values string.
 *
 * @example
 * 'key1 = value1, key2 = value2, ...'
 * "job_number = \'estimates 1\'"
 */
const _buildValuesString = (req) => {
    const body = req.body;
    const values = Object.keys(body).map(
      // [order_name, status].map()
      (key) => `${key} = ${mysql.escape(body[key])}` // 'New 1 Job number'
    );
  
    //values.push(`created_date = NOW()`); // update current date and time
    values.join(', '); // make into a string
    return values;
  };

// http://localhost:3000/estimates/1
/**
 * PUT request -
 * {
 *      job_number  :   'A job number'
 *      pipe_size   :   'Pipe size'
 *      total_num_holes :   'Total number of holes'
 * }
 */
 
exports.updateEstimate = async (req, res) => {
    // establish connection
    const con = await connection().catch((err) => {
      throw err;
    });
  
    const values = _buildValuesString(req);
  
    // query update order
    const result = await query(
      con,
      UPDATE_ESTIMATE(req.user.id, req.params.estimateId, values)
      ).catch(serverError(res));
  
    if (result.affectedRows !== 1) {
      res
        .status(500)
        .json({ msg: `Unable to update estimate: '${req.body.estimate_id}'`});
    }
    res.json(result);
  };

  // http://localhost:3000/estimate/1
exports.deleteEstimate = async (req, res) => {
    // establish connection
    const con = await connection().catch((err) => {
      throw err;
    });
  
    // query estimate order
    const result = await query(
      con, 
      DELETE_ESTIMATE(req.user.id, req.params.estimateId)
      ).catch(serverError(res));
  
    if (result.affectedRows !== 1) {
      res
        .status(500)
        .json({ msg: `Unable to delete estimate at: ${req.params.estimateId}` });
    }
    res.json({ msg: 'Delete successfully.'});
  };