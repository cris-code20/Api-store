const Address = require('../models/Address.js');

exports.getAllByUser = async (req, res, next) => {
  try {
    const addresses = await Address.getAllByUser(req.params.userId);
    res.json(addresses);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const address = await Address.getById(req.params.id);
    if (!address) return res.status(404).json({ message: 'Dirección no encontrada' });
    res.json(address);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const nueva = await Address.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const actualizada = await Address.update(req.params.id, req.body);
    res.json(actualizada);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const deleted = await Address.delete(req.params.id);
    res.json({ success: deleted });
  } catch (err) {
    next(err);
  }
};
