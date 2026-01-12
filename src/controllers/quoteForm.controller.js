const { QuoteForm } = require('../models');

const DEFAULT_CALCULATE_TEXT = 'Расчитать стоимость';

function toDto(item) {
  return {
    id: item.id,
    fromLabel: item.fromLabel,
    fromDefault: item.fromDefault,

    cargoLabel: item.cargoLabel,
    cargoDefault: item.cargoDefault,

    toLabel: item.toLabel,
    toDefault: item.toDefault,

    weightLabel: item.weightLabel,
    weightDefault: item.weightDefault,

    transportLabel: item.transportLabel,
    transportDefault: item.transportDefault,
    calculateText: item.calculateText,

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

async function listQuoteForms(req, res, next) {
  try {
    const items = await QuoteForm.findAll({ order: [['id', 'ASC']] });
    return res.json(items.map(toDto));
  } catch (err) {
    return next(err);
  }
}

async function getQuoteForm(req, res, next) {
  try {
    const { id } = req.params;
    const item = await QuoteForm.findByPk(id);

    if (!item) return res.status(404).json({ message: 'Quote form not found' });

    return res.json(toDto(item));
  } catch (err) {
    return next(err);
  }
}

async function createQuoteForm(req, res, next) {
  try {
    const body = req.body;

    const requiredFields = [
      'fromLabel',
      'cargoLabel',
      'toLabel',
      'weightLabel',
      'transportLabel',
    ];

    for (const key of requiredFields) {
      const errMsg = requiredString(body[key], key);
      if (errMsg) return res.status(400).json({ message: errMsg });
    }

    const optionalFields = [
      'fromDefault',
      'cargoDefault',
      'toDefault',
      'weightDefault',
      'transportDefault',
    ];

    for (const key of optionalFields) {
      const errMsg = optionalString(body[key], key);
      if (errMsg) return res.status(400).json({ message: errMsg });
    }

    const item = await QuoteForm.create({
      fromLabel: body.fromLabel,
      fromDefault: body.fromDefault || null,

      cargoLabel: body.cargoLabel,
      cargoDefault: body.cargoDefault || null,

      toLabel: body.toLabel,
      toDefault: body.toDefault || null,

      weightLabel: body.weightLabel,
      weightDefault: body.weightDefault || null,

      transportLabel: body.transportLabel,
      transportDefault: body.transportDefault || null,
      calculateText: body.calculateText || DEFAULT_CALCULATE_TEXT,
    });

    return res.status(201).json(toDto(item));
  } catch (err) {
    return next(err);
  }
}

async function updateQuoteForm(req, res, next) {
  try {
    const { id } = req.params;
    const item = await QuoteForm.findByPk(id);

    if (!item) return res.status(404).json({ message: 'Quote form not found' });

    const body = req.body;

    const allFields = [
      'fromLabel',
      'fromDefault',
      'cargoLabel',
      'cargoDefault',
      'toLabel',
      'toDefault',
      'weightLabel',
      'weightDefault',
      'transportLabel',
      'transportDefault',
      'calculateText',
    ];

    for (const key of allFields) {
      if (body[key] === undefined) continue;

      const isOptionalDefault = key.endsWith('Default');
      if (isOptionalDefault) {
        const errMsg = optionalString(body[key], key);
        if (errMsg) return res.status(400).json({ message: errMsg });
        item[key] = body[key] ? body[key] : null;
        continue;
      }

      if (key === 'calculateText') {
        // Not required from admin; if provided, must be non-empty string
        const errMsg = requiredString(body[key], key);
        if (errMsg) return res.status(400).json({ message: `${key} must be a non-empty string` });
        item[key] = body[key];
        continue;
      }

      const errMsg = requiredString(body[key], key);
      if (errMsg) return res.status(400).json({ message: `${key} must be a non-empty string` });

      item[key] = body[key];
    }

    await item.save();
    return res.json(toDto(item));
  } catch (err) {
    return next(err);
  }
}

async function deleteQuoteForm(req, res, next) {
  try {
    const { id } = req.params;
    const item = await QuoteForm.findByPk(id);

    if (!item) return res.status(404).json({ message: 'Quote form not found' });

    await item.destroy();
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  listQuoteForms,
  getQuoteForm,
  createQuoteForm,
  updateQuoteForm,
  deleteQuoteForm,
};
