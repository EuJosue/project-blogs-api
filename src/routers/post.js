const router = require('express').Router();
const { postController } = require('../controllers');
const validatePost = require('../middlewares/validatePost');
const validateToken = require('../middlewares/validateToken');
const validateUpdatePost = require('../middlewares/validateUpdatePost');

router.post('/', validateToken, validatePost, postController.create);

router.get('/', validateToken, postController.findAll);

router.get('/:id', validateToken, postController.findById);

router.delete('/:id', validateToken, postController.remove);

router.put('/:id', validateToken, validateUpdatePost, postController.update);

module.exports = router;