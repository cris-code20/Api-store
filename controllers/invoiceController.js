const Invoice = require('../models/Invoice');

exports.getAll = async (req, res, next) => {
  try {
    const invoices = await Invoice.getAll();
    res.json(invoices);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const invoice = await Invoice.getById(req.params.id);
    if (!invoice) return res.status(404).json({ message: 'Factura no encontrada' });
    res.json(invoice);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const inv = await Invoice.create(req.body);
    res.status(201).json(inv);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const deleted = await Invoice.delete(req.params.id);
    res.json({ success: deleted });
  } catch (err) {
    next(err);
  }
};
