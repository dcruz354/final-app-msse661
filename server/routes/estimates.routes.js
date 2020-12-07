const express = require('express');
const {
    getAllEstimates,
    createEstimate,
    getEstimate,
    updateEstimate,
    deleteEstimate,
} = require('../controllers/estimates.controllers');
const canAccess = require('../middleware/auth.middleware');

const estimatesRoutes = express.Router();
/**
 * Express routes for Estimates.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all estimates. Evaluates to `/estimates/`.
 */
estimatesRoutes.get('/', canAccess, getAllEstimates).post('/', canAccess, createEstimate);

/**
 * Routes for estimates by estimate id. Evalutes to `/estimates/:estimate_id`.
 */
estimatesRoutes
  .get('/:estimateId', canAccess, getEstimate) // GET http://locahost:3000/estimates/1
  .put('/:estimateId', canAccess, updateEstimate)
  .delete('/:estimateId', canAccess, deleteEstimate);

module.exports = estimatesRoutes;