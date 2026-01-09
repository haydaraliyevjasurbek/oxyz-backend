const { QuoteRequest } = require('../models');

function toDto(item) {
  return {
    id: item.id,
    from: item.from,
    to: item.to,
    cargo: item.cargo,
    weight: item.weight,
    transport: item.transport,
    name: item.name,
    phone: item.phone,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

function requiredString(value, field) {
  if (!value || typeof value !== 'string') {
    return `${field} is required`;
  }
  return null;
}

function optionalString(value, field) {
  if (value === undefined) return null;
  if (value === null) return null;
  if (typeof value !== 'string') {
    return `${field} must be a string`;
  }
  return null;
}

function validatePayload(body, required = true) {
  const fields = ['from', 'to', 'cargo', 'weight', 'transport', 'name', 'phone'];

  if (required) {
    for (const key of fields) {
      const errMsg = requiredString(body[key], key);
      if (errMsg) return errMsg;
    }
    return null;
  }

  for (const key of fields) {
    if (body[key] === undefined) continue;
    const errMsg = optionalString(body[key], key);
    if (errMsg) return errMsg;
    if (typeof body[key] === 'string' && body[key].trim().length === 0) {
      return `${key} must be a non-empty string`;
    }
  }

  return null;
}

// Public endpoint for website: user clicks "Расчитать стоимость"
async function createQuoteRequestPublic(req, res, next) {
  try {
    const body = req.body;
    const errMsg = validatePayload(body, true);
    if (errMsg) return res.status(400).json({ message: errMsg });

    const item = await QuoteRequest.create({
      from: body.from,
      to: body.to,
      cargo: body.cargo,
      weight: body.weight,
      transport: body.transport,
      name: body.name,
      phone: body.phone,
    });

    return res.status(201).json(toDto(item));
  } catch (err) {
    return next(err);
  }
}

// Admin CRUD
async function listQuoteRequests(req, res, next) {
  try {
    const items = await QuoteRequest.findAll({ order: [['id', 'DESC']] });
    return res.json(items.map(toDto));
  } catch (err) {
    return next(err);
  }
}

async function getQuoteRequest(req, res, next) {
  try {
    const { id } = req.params;
    const item = await QuoteRequest.findByPk(id);
    if (!item) return res.status(404).json({ message: 'Quote request not found' });
    return res.json(toDto(item));
  } catch (err) {
    return next(err);
  }
}

async function createQuoteRequestAdmin(req, res, next) {
  try {
    const body = req.body;
    const errMsg = validatePayload(body, true);
    if (errMsg) return res.status(400).json({ message: errMsg });

    const item = await QuoteRequest.create({
      from: body.from,
      to: body.to,
      cargo: body.cargo,
      weight: body.weight,
      transport: body.transport,
      name: body.name,
      phone: body.phone,
    });

    return res.status(201).json(toDto(item));
  } catch (err) {
    return next(err);
  }
}

async function updateQuoteRequest(req, res, next) {
  try {
    const { id } = req.params;
    const item = await QuoteRequest.findByPk(id);
    if (!item) return res.status(404).json({ message: 'Quote request not found' });

    const body = req.body;
    const errMsg = validatePayload(body, false);
    if (errMsg) return res.status(400).json({ message: errMsg });

    const fields = ['from', 'to', 'cargo', 'weight', 'transport', 'name', 'phone'];
    for (const key of fields) {
      if (body[key] === undefined) continue;
      item[key] = body[key];
    }

    await item.save();
    return res.json(toDto(item));
  } catch (err) {
    return next(err);
  }
}

async function deleteQuoteRequest(req, res, next) {
  try {
    const { id } = req.params;
    const item = await QuoteRequest.findByPk(id);
    if (!item) return res.status(404).json({ message: 'Quote request not found' });

    await item.destroy();
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  createQuoteRequestPublic,
  listQuoteRequests,
  getQuoteRequest,
  createQuoteRequestAdmin,
  updateQuoteRequest,
  deleteQuoteRequest,
};
