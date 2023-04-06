const router = require('express').Router();
const { postController } = require('../controllers');
const validatePost = require('../middlewares/validatePost');
const validateToken = require('../middlewares/validateToken');

router.post('/', validateToken, validatePost, postController.create);

module.exports = router;