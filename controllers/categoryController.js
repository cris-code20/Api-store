const Category = require('../models/Category');

exports.getAll = async (req, res, next) => {
    try {
        const rows = await Category.getAll();
        res.json(rows);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const category = await Category.getById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
        res.json(category);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const updated = await Category.update(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deleted = await Category.delete(req.params.id);
        res.json({ success: deleted });
    } catch (err) {
        next(err);
    }
};
