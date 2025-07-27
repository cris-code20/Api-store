const express = require('express');
const router = express.Router();
const address = require('../controllers/addressController');

router.get('/user/:userId', address.getAllByUser);
router.get('/:id', address.getById);
router.post('/', address.create);
router.put('/:id', address.update);
router.delete('/:id', address.delete);

module.exports = router;
