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

// ✅ MODIFICADO: create para manejar imagen
exports.create = async (req, res, next) => {
  try {
    const { category_id, name, description, price, stock } = req.body;
    
    // Si hay archivo subido, usar su ruta, sino null
    const image_url = req.file ? `/uploads/products/${req.file.filename}` : null;
    
    const productData = {
      category_id,
      name,
      description,
      price,
      stock,
      image_url  // ✅ Usar image_url como en tu modelo
    };
    
    const newItem = await Product.create(productData);
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
};

// ✅ MODIFICADO: update para manejar imagen
exports.update = async (req, res, next) => {
  try {
    const { category_id, name, description, price, stock } = req.body;
    
    // Obtener el producto actual para preservar image_url si no se envía nueva imagen
    const currentProduct = await Product.getById(req.params.id);
    if (!currentProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    const updateData = {
      category_id: category_id || currentProduct.category_id,
      name: name || currentProduct.name,
      description: description || currentProduct.description,
      price: price || currentProduct.price,
      stock: stock !== undefined ? stock : currentProduct.stock,
      image_url: req.file ? `/uploads/products/${req.file.filename}` : currentProduct.image_url
    };
    
    const updated = await Product.update(req.params.id, updateData);
    res.json(updated);
  } catch(err) {
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