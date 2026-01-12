const { Faq } = require('../models');

function toDto(item) {
  return {
    id: item.id,
    order: item.order,
    question: item.question,
    answer: item.answer,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

async function listFaqs(req, res, next) {
  try {
    const faqs = await Faq.findAll({
      order: [['order', 'ASC'], ['id', 'ASC']],
    });

    return res.json(faqs.map(toDto));
  } catch (err) {
    return next(err);
  }
}

async function getFaq(req, res, next) {
  try {
    const { id } = req.params;
    const item = await Faq.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    return res.json(toDto(item));
  } catch (err) {
    return next(err);
  }
}

async function createFaq(req, res, next) {
  try {
    const { order, question, answer } = req.body;

    if (order === undefined || order === null || Number.isNaN(Number(order))) {
      return res.status(400).json({ message: 'order is required and must be a number' });
    }
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ message: 'question is required' });
    }
    if (!answer || typeof answer !== 'string') {
      return res.status(400).json({ message: 'answer is required' });
    }

    const item = await Faq.create({
      order: Number(order),
      question,
      answer,
    });

    return res.status(201).json(toDto(item));
  } catch (err) {
    return next(err);
  }
}

async function updateFaq(req, res, next) {
  try {
    const { id } = req.params;
    const item = await Faq.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    const { order, question, answer } = req.body;

    if (order !== undefined) {
      if (order === null || Number.isNaN(Number(order))) {
        return res.status(400).json({ message: 'order must be a number' });
      }
      item.order = Number(order);
    }

    if (question !== undefined) {
      if (!question || typeof question !== 'string') {
        return res.status(400).json({ message: 'question must be a non-empty string' });
      }
      item.question = question;
    }

    if (answer !== undefined) {
      if (!answer || typeof answer !== 'string') {
        return res.status(400).json({ message: 'answer must be a non-empty string' });
      }
      item.answer = answer;
    }

    await item.save();
    return res.json(toDto(item));
  } catch (err) {
    return next(err);
  }
}

async function deleteFaq(req, res, next) {
  try {
    const { id } = req.params;
    const item = await Faq.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    await item.destroy();
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  listFaqs,
  getFaq,
  createFaq,
  updateFaq,
  deleteFaq,
};
