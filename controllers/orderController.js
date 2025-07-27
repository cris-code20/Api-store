const Order = require('../models/Order');

exports.getAll = async (req, res, next) => {
  try {
    const orders = await Order.getAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const order = await Order.getById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await Order.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const deleted = await Order.delete(req.params.id);
    res.json({ success: deleted });
  } catch (err) {
    next(err);
  }
};