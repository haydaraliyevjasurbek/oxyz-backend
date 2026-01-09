const { Service } = require('../models');

function toDto(service, { includeImage = false } = {}) {
  const dto = {
    id: service.id,
    title: service.title,
    description: service.description,
    imageMimeType: service.imageMimeType ?? null,
    createdAt: service.createdAt,
    updatedAt: service.updatedAt,
  };

  if (includeImage) {
    dto.image = service.image ? service.image.toString('base64') : null;
  }

  return dto;
}

async function createService(req, res, next) {
  try {
    const { title, description } = req.body;

    if (!title || typeof title !== 'string') {
      return res.status(400).json({ message: 'title is required' });
    }
    if (!description || typeof description !== 'string') {
      return res.status(400).json({ message: 'description is required' });
    }

    const payload = { title, description };

    if (req.file) {
      payload.image = req.file.buffer;
      payload.imageMimeType = req.file.mimetype;
    }

    const service = await Service.create(payload);
    return res.status(201).json(toDto(service));
  } catch (err) {
    return next(err);
  }
}

async function listServices(req, res, next) {
  try {
    const services = await Service.findAll({
      attributes: { exclude: ['image'] },
      order: [['id', 'DESC']],
    });

    return res.json(services.map(s => toDto(s)));
  } catch (err) {
    return next(err);
  }
}

async function getService(req, res, next) {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    return res.json(toDto(service, { includeImage: true }));
  } catch (err) {
    return next(err);
  }
}

async function getServiceImage(req, res, next) {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id, {
      attributes: ['id', 'image', 'imageMimeType'],
    });

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    if (!service.image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Avoid stale images after updates (browsers may cache same URL)
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');

    res.setHeader('Content-Type', service.imageMimeType || 'application/octet-stream');
    return res.send(service.image);
  } catch (err) {
    return next(err);
  }
}

async function updateServiceImage(req, res, next) {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'image file is required' });
    }

    service.image = req.file.buffer;
    service.imageMimeType = req.file.mimetype;

    await service.save();
    return res.json(toDto(service));
  } catch (err) {
    return next(err);
  }
}

async function deleteServiceImage(req, res, next) {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    service.image = null;
    service.imageMimeType = null;
    await service.save();

    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

async function updateService(req, res, next) {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const { title, description } = req.body;

    if (title !== undefined) {
      if (!title || typeof title !== 'string') {
        return res.status(400).json({ message: 'title must be a non-empty string' });
      }
      service.title = title;
    }

    if (description !== undefined) {
      if (!description || typeof description !== 'string') {
        return res.status(400).json({ message: 'description must be a non-empty string' });
      }
      service.description = description;
    }

    if (req.file) {
      service.image = req.file.buffer;
      service.imageMimeType = req.file.mimetype;
    }

    await service.save();
    return res.json(toDto(service));
  } catch (err) {
    return next(err);
  }
}

async function deleteService(req, res, next) {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await service.destroy();
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  createService,
  listServices,
  getService,
  getServiceImage,
  updateServiceImage,
  deleteServiceImage,
  updateService,
  deleteService,
};
