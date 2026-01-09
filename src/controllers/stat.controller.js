const { Stat } = require('../models');

function toDto(stat) {
  return {
    id: stat.id,
    order: stat.order,
    value: stat.value,
    label: stat.label,
    iconMimeType: stat.iconMimeType ?? null,
    createdAt: stat.createdAt,
    updatedAt: stat.updatedAt,
  };
}

async function listStats(req, res, next) {
  try {
    const stats = await Stat.findAll({
      attributes: { exclude: ['icon'] },
      order: [['order', 'ASC'], ['id', 'ASC']],
    });

    return res.json(stats.map(toDto));
  } catch (err) {
    return next(err);
  }
}

async function getStat(req, res, next) {
  try {
    const { id } = req.params;
    const stat = await Stat.findByPk(id, { attributes: { exclude: ['icon'] } });

    if (!stat) {
      return res.status(404).json({ message: 'Stat not found' });
    }

    return res.json(toDto(stat));
  } catch (err) {
    return next(err);
  }
}

async function getStatIcon(req, res, next) {
  try {
    const { id } = req.params;
    const stat = await Stat.findByPk(id, {
      attributes: ['id', 'icon', 'iconMimeType'],
    });

    if (!stat) {
      return res.status(404).json({ message: 'Stat not found' });
    }

    if (!stat.icon) {
      return res.status(404).json({ message: 'Icon not found' });
    }

    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Content-Type', stat.iconMimeType || 'application/octet-stream');
    return res.send(stat.icon);
  } catch (err) {
    return next(err);
  }
}

async function createStat(req, res, next) {
  try {
    const { order, value, label } = req.body;

    if (order === undefined || order === null || Number.isNaN(Number(order))) {
      return res.status(400).json({ message: 'order is required and must be a number' });
    }
    if (!value || typeof value !== 'string') {
      return res.status(400).json({ message: 'value is required' });
    }
    if (!label || typeof label !== 'string') {
      return res.status(400).json({ message: 'label is required' });
    }

    const payload = {
      order: Number(order),
      value,
      label,
    };

    if (req.file) {
      payload.icon = req.file.buffer;
      payload.iconMimeType = req.file.mimetype;
    }

    const stat = await Stat.create(payload);
    return res.status(201).json(toDto(stat));
  } catch (err) {
    return next(err);
  }
}

async function updateStat(req, res, next) {
  try {
    const { id } = req.params;
    const stat = await Stat.findByPk(id);

    if (!stat) {
      return res.status(404).json({ message: 'Stat not found' });
    }

    const { order, value, label } = req.body;

    if (order !== undefined) {
      if (order === null || Number.isNaN(Number(order))) {
        return res.status(400).json({ message: 'order must be a number' });
      }
      stat.order = Number(order);
    }

    if (value !== undefined) {
      if (!value || typeof value !== 'string') {
        return res.status(400).json({ message: 'value must be a non-empty string' });
      }
      stat.value = value;
    }

    if (label !== undefined) {
      if (!label || typeof label !== 'string') {
        return res.status(400).json({ message: 'label must be a non-empty string' });
      }
      stat.label = label;
    }

    if (req.file) {
      stat.icon = req.file.buffer;
      stat.iconMimeType = req.file.mimetype;
    }

    await stat.save();
    return res.json(toDto(stat));
  } catch (err) {
    return next(err);
  }
}

async function updateStatIcon(req, res, next) {
  try {
    const { id } = req.params;
    const stat = await Stat.findByPk(id);

    if (!stat) {
      return res.status(404).json({ message: 'Stat not found' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'icon file is required' });
    }

    stat.icon = req.file.buffer;
    stat.iconMimeType = req.file.mimetype;
    await stat.save();

    return res.json(toDto(stat));
  } catch (err) {
    return next(err);
  }
}

async function deleteStatIcon(req, res, next) {
  try {
    const { id } = req.params;
    const stat = await Stat.findByPk(id);

    if (!stat) {
      return res.status(404).json({ message: 'Stat not found' });
    }

    stat.icon = null;
    stat.iconMimeType = null;
    await stat.save();

    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

async function deleteStat(req, res, next) {
  try {
    const { id } = req.params;
    const stat = await Stat.findByPk(id);

    if (!stat) {
      return res.status(404).json({ message: 'Stat not found' });
    }

    await stat.destroy();
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  listStats,
  getStat,
  getStatIcon,
  createStat,
  updateStat,
  updateStatIcon,
  deleteStatIcon,
  deleteStat,
};
