const express = require('express');
const {
  listQuoteRequests,
  getQuoteRequest,
  createQuoteRequestAdmin,
  updateQuoteRequest,
  deleteQuoteRequest,
} = require('../controllers/quoteRequest.controller');

const router = express.Router();

router.get('/', listQuoteRequests);
router.get('/:id', getQuoteRequest);
router.post('/', createQuoteRequestAdmin);
router.put('/:id', updateQuoteRequest);
router.delete('/:id', deleteQuoteRequest);

module.exports = router;
