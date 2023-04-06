const { postService } = require('../services');

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;
  const category = await postService.create(title, content, categoryIds, id);

  return res.status(201).json(category);
};

module.exports = {
  create,
};