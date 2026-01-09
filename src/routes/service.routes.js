const express = require('express');

const {
  createService,
  listServices,
  getService,
  getServiceImage,
  updateServiceImage,
  deleteServiceImage,
  updateService,
  deleteService,
} = require('../controllers/service.controller');

const { upload } = require('../middlewares/upload');

const router = express.Router();

router.get('/', listServices);
router.get('/:id', getService);
router.put('/:id/image', upload.single('image'), updateServiceImage);
router.delete('/:id/image', deleteServiceImage);

router.post('/', upload.single('image'), createService);
router.put('/:id', upload.single('image'), updateService);
router.delete('/:id', deleteService);

module.exports = router;
