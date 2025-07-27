const Product = require('../models/Product');

exports.getAll = async (req, res, next) => {
  try {
    const items = await Product.getAll();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const item = await Product.getById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const newItem = await Product.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await Product.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const deleted = await Product.delete(req.params.id);
    res.json({ success: deleted });
  } catch (err) {
    next(err);
  }
};