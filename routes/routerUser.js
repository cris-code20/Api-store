const express = require('express')
const router = express.Router();
const user = require('../controllers/userController')
const { authenticate, requireAdmin } = require('../middlewares/auth');


// rutas


router.get('/',  authenticate,user.getAllUsers);
router.get('/:id', authenticate, user.getById);
router.post('/', authenticate, user.createUser);
router.put('/:id', authenticate, user.updateUsers);
router.delete('/:id', authenticate, user.deleteUser);


module.exports = router;
