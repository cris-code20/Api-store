const express = require('express')
const router = express.Router();
const category = require('../controllers/categoryController')
const { authenticate, requireAdmin } = require('../middlewares/auth');


router.get('/', category.getAll);
router.get('/:id', category.getById);
router.post('/', authenticate, requireAdmin,category.create);
router.put('/:id', authenticate, requireAdmin,category.update);
router.delete('/:id', authenticate, requireAdmin,category.delete);


module.exports = router;
