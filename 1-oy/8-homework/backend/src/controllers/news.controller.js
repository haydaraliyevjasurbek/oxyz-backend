const { News } = require('../models');

function toDto(item) {
  return {
    id: item.id,
    title: item.title,
    summary: item.summary,
    content: item.content,
    publishedAt: item.publishedAt,
    imageMimeType: item.imageMimeType ?? null,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

async function listNews(req, res, next) {
  try {
    const items = await News.findAll({
      attributes: { exclude: ['image'] },
      order: [['publishedAt', 'DESC'], ['id', 'DESC']],
    });

    return res.json(items.map(toDto));
  } catch (err) {
    return next(err);
  }
}

async function getNews(req, res, next) {
  try {
    const { id } = req.params;
    const item = await News.findByPk(id, { attributes: { exclude: ['image'] } });

    if (!item) {
      return res.status(404).json({ message: 'News not found' });
    }

    return res.json(toDto(item));
  } catch (err) {
    return next(err);
  }
}

async function getNewsImage(req, res, next) {
  try {
    const { id } = req.params;
    const item = await News.findByPk(id, {
      attributes: ['id', 'image', 'imageMimeType'],
    });

    if (!item) {
      return res.status(404).json({ message: 'News not found' });
    }

    if (!item.image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Content-Type', item.imageMimeType || 'application/octet-stream');
    return res.send(item.image);
  } catch (err) {
    return next(err);
  }
}

async function createNews(req, res, next) {
  try {
    const { title, summary, content, publishedAt } = req.body;

    if (!title || typeof title !== 'string') {
      return res.status(400).json({ message: 'title is required' });
    }
    if (!summary || typeof summary !== 'string') {
      return res.status(400).json({ message: 'summary is required' });
    }
    if (!content || typeof content !== 'string') {
      return res.status(400).json({ message: 'content is required' });
    }
    if (!publishedAt || typeof publishedAt !== 'string') {
      return res.status(400).json({ message: 'publishedAt is required (YYYY-MM-DD)' });
    }

    const payload = { title, summary, content, publishedAt };

    if (req.file) {
      payload.image = req.file.buffer;
      payload.imageMimeType = req.file.mimetype;
    }

    const item = await News.create(payload);
    return res.status(201).json(toDto(item));
  } catch (err) {
    return next(err);
  }
}

async function updateNews(req, res, next) {
  try {
    const { id } = req.params;
    const item = await News.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: 'News not found' });
    }

    const { title, summary, content, publishedAt } = req.body;

    if (title !== undefined) {
      if (!title || typeof title !== 'string') {
        return res.status(400).json({ message: 'title must be a non-empty string' });
      }
      item.title = title;
    }

    if (summary !== undefined) {
      if (!summary || typeof summary !== 'string') {
        return res.status(400).json({ message: 'summary must be a non-empty string' });
      }
      item.summary = summary;
    }

    if (content !== undefined) {
      if (!content || typeof content !== 'string') {
        return res.status(400).json({ message: 'content must be a non-empty string' });
      }
      item.content = content;
    }

    if (publishedAt !== undefined) {
      if (!publishedAt || typeof publishedAt !== 'string') {
        return res.status(400).json({ message: 'publishedAt must be YYYY-MM-DD' });
      }
      item.publishedAt = publishedAt;
    }

    if (req.file) {
      item.image = req.file.buffer;
      item.imageMimeType = req.file.mimetype;
    }

    await item.save();
    return res.json(toDto(item));
  } catch (err) {
    return next(err);
  }
}

async function deleteNews(req, res, next) {
  try {
    const { id } = req.params;
    const item = await News.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: 'News not found' });
    }

    await item.destroy();
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  listNews,
  getNews,
  getNewsImage,
  createNews,
  updateNews,
  deleteNews,
};
