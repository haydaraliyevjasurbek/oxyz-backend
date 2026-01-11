const express = require('express');

const {
  createQuoteForm,
  updateQuoteForm,
  deleteQuoteForm,
} = require('../controllers/quoteForm.controller');

const router = express.Router();

router.post('/', createQuoteForm);
router.put('/:id', updateQuoteForm);
router.delete('/:id', deleteQuoteForm);

module.exports = router;
