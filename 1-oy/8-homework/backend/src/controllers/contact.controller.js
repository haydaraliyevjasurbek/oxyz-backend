const { Contact } = require('../models');

function toDto(item) {
  return {
    id: item.id,
    phone1: item.phone1,
    phone2: item.phone2,
    email: item.email,
    address: item.address,
    mapEmbed: item.mapEmbed,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

async function listContacts(req, res, next) {
  try {
    const items = await Contact.findAll({
      order: [['id', 'ASC']],
    });

    return res.json(items.map(toDto));
  } catch (err) {
    return next(err);
  }
}

async function getContact(req, res, next) {
  try {
    const { id } = req.params;
    const item = await Contact.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    return res.json(toDto(item));
  } catch (err) {
    return next(err);
  }
}

async function createContact(req, res, next) {
  try {
    const {
      phone1,
      phone2,
      email,
      address,
      mapEmbed,
    } = req.body;

    if (!phone1 || typeof phone1 !== 'string') {
      return res.status(400).json({ message: 'phone1 is required' });
    }
    if (phone2 !== undefined && phone2 !== null && typeof phone2 !== 'string') {
      return res.status(400).json({ message: 'phone2 must be a string' });
    }
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ message: 'email is required' });
    }
    if (!address || typeof address !== 'string') {
      return res.status(400).json({ message: 'address is required' });
    }
    if (!mapEmbed || typeof mapEmbed !== 'string') {
      return res.status(400).json({ message: 'mapEmbed is required' });
    }

    const item = await Contact.create({
      phone1,
      phone2: phone2 || null,
      email,
      address,
      mapEmbed,
    });

    return res.status(201).json(toDto(item));
  } catch (err) {
    return next(err);
  }
}

async function updateContact(req, res, next) {
  try {
    const { id } = req.params;
    const item = await Contact.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    const {
      phone1,
      phone2,
      email,
      address,
      mapEmbed,
    } = req.body;

    if (phone1 !== undefined) {
      if (!phone1 || typeof phone1 !== 'string') {
        return res.status(400).json({ message: 'phone1 must be a non-empty string' });
      }
      item.phone1 = phone1;
    }

    if (phone2 !== undefined) {
      if (phone2 !== null && phone2 !== '' && typeof phone2 !== 'string') {
        return res.status(400).json({ message: 'phone2 must be a string' });
      }
      item.phone2 = phone2 ? phone2 : null;
    }

    if (email !== undefined) {
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: 'email must be a non-empty string' });
      }
      item.email = email;
    }

    if (address !== undefined) {
      if (!address || typeof address !== 'string') {
        return res.status(400).json({ message: 'address must be a non-empty string' });
      }
      item.address = address;
    }

    if (mapEmbed !== undefined) {
      if (!mapEmbed || typeof mapEmbed !== 'string') {
        return res.status(400).json({ message: 'mapEmbed must be a non-empty string' });
      }
      item.mapEmbed = mapEmbed;
    }

    await item.save();
    return res.json(toDto(item));
  } catch (err) {
    return next(err);
  }
}

async function deleteContact(req, res, next) {
  try {
    const { id } = req.params;
    const item = await Contact.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    await item.destroy();
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  listContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
