const router = require('express').Router();
const { categoryController } = require('../controllers');
const validateName = require('../middlewares/validateName');
const validateToken = require('../middlewares/validateToken');

router.post('/', validateToken, validateName, categoryController.create);

module.exports = router;