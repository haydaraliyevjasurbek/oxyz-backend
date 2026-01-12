const { ProcessStep } = require('../models');

function toDto(step) {
  return {
    id: step.id,
    order: step.order,
    title: step.title,
    description: step.description,
    details: step.details ?? null,
    createdAt: step.createdAt,
    updatedAt: step.updatedAt,
  };
}

async function listProcessSteps(req, res, next) {
  try {
    const steps = await ProcessStep.findAll({
      order: [['order', 'ASC'], ['id', 'ASC']],
    });

    return res.json(steps.map(toDto));
  } catch (err) {
    return next(err);
  }
}

async function getProcessStep(req, res, next) {
  try {
    const { id } = req.params;
    const step = await ProcessStep.findByPk(id);

    if (!step) {
      return res.status(404).json({ message: 'Process step not found' });
    }

    return res.json(toDto(step));
  } catch (err) {
    return next(err);
  }
}

async function createProcessStep(req, res, next) {
  try {
    const { order, title, description, details } = req.body;

    if (order === undefined || order === null || Number.isNaN(Number(order))) {
      return res.status(400).json({ message: 'order is required and must be a number' });
    }
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ message: 'title is required' });
    }
    if (!description || typeof description !== 'string') {
      return res.status(400).json({ message: 'description is required' });
    }

    if (details !== undefined && details !== null && typeof details !== 'string') {
      return res.status(400).json({ message: 'details must be a string' });
    }

    const step = await ProcessStep.create({
      order: Number(order),
      title,
      description,
      details: details ?? null,
    });

    return res.status(201).json(toDto(step));
  } catch (err) {
    return next(err);
  }
}

async function updateProcessStep(req, res, next) {
  try {
    const { id } = req.params;
    const step = await ProcessStep.findByPk(id);

    if (!step) {
      return res.status(404).json({ message: 'Process step not found' });
    }

    const { order, title, description, details } = req.body;

    if (order !== undefined) {
      if (order === null || Number.isNaN(Number(order))) {
        return res.status(400).json({ message: 'order must be a number' });
      }
      step.order = Number(order);
    }

    if (title !== undefined) {
      if (!title || typeof title !== 'string') {
        return res.status(400).json({ message: 'title must be a non-empty string' });
      }
      step.title = title;
    }

    if (description !== undefined) {
      if (!description || typeof description !== 'string') {
        return res.status(400).json({ message: 'description must be a non-empty string' });
      }
      step.description = description;
    }

    if (details !== undefined) {
      if (details !== null && typeof details !== 'string') {
        return res.status(400).json({ message: 'details must be a string' });
      }
      step.details = details;
    }

    await step.save();
    return res.json(toDto(step));
  } catch (err) {
    return next(err);
  }
}

async function deleteProcessStep(req, res, next) {
  try {
    const { id } = req.params;
    const step = await ProcessStep.findByPk(id);

    if (!step) {
      return res.status(404).json({ message: 'Process step not found' });
    }

    await step.destroy();
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  listProcessSteps,
  getProcessStep,
  createProcessStep,
  updateProcessStep,
  deleteProcessStep,
};
