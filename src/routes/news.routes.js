const express = require('express');

const {
  createNews,
  updateNews,
  deleteNews,
} = require('../controllers/news.controller');

const { upload } = require('../middlewares/upload');

const router = express.Router();

router.post('/', upload.single('image'), createNews);
router.put('/:id', upload.single('image'), updateNews);
router.delete('/:id', deleteNews);

module.exports = router;
