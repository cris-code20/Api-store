const express = require('express')
const router = express.Router();
const user = require('../controllers/userController')


// rutas


router.get('/', user.getAllUsers);
router.get('/:id', user.getById);
router.post('/', user.createUser);
router.put('/:id', user.updateUsers);
router.delete('/:id', user.deleteUser);


module.exports = router;
