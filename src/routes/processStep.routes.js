const express = require('express');

const {
  createProcessStep,
  updateProcessStep,
  deleteProcessStep,
} = require('../controllers/processStep.controller');

const router = express.Router();

router.post('/', createProcessStep);
router.put('/:id', updateProcessStep);
router.delete('/:id', deleteProcessStep);

module.exports = router;
