const router = require('express').Router();
const { postController } = require('../controllers');
const validatePost = require('../middlewares/validatePost');
const validateToken = require('../middlewares/validateToken');
const validateUpdatePost = require('../middlewares/validateUpdatePost');

router.use(validateToken);

router.post('/', validatePost, postController.create);

router.get('/', postController.findAll);

router.get('/search', postController.search);

router.get('/:id', postController.findById);

router.delete('/:id', postController.remove);

router.put('/:id', validateUpdatePost, postController.update);

module.exports = router;