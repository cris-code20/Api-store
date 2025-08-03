const express = require('express');
const router = express.Router();
const invoice = require('../controllers/invoiceController');

router.get('/',authenticate, invoice.getAll);
router.get('/:id', authenticate, invoice.getById);
router.post('/',  authenticate, invoice.create);
router.delete('/:id', authenticate, invoice.delete);

module.exports = router;
