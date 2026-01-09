const express = require('express');

const {
  createFaq,
  updateFaq,
  deleteFaq,
} = require('../controllers/faq.controller');

const router = express.Router();

router.post('/', createFaq);
router.put('/:id', updateFaq);
router.delete('/:id', deleteFaq);

module.exports = router;
