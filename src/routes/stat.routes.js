const express = require('express');

const {
  createStat,
  updateStat,
  updateStatIcon,
  deleteStatIcon,
  deleteStat,
} = require('../controllers/stat.controller');

const { upload } = require('../middlewares/upload');

const router = express.Router();

router.post('/', upload.single('icon'), createStat);
router.put('/:id', upload.single('icon'), updateStat);
router.put('/:id/icon', upload.single('icon'), updateStatIcon);
router.delete('/:id/icon', deleteStatIcon);
router.delete('/:id', deleteStat);

module.exports = router;
