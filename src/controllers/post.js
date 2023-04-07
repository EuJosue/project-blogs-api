const { postService } = require('../services');

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;
  const category = await postService.create(title, content, categoryIds, id);

  return res.status(201).json(category);
};

const findAll = async (_req, res) => {
  const posts = await postService.findAll();

  return res.status(200).json(posts);
};

const findById = async (req, res) => {
  const { id } = req.params;
  
  const post = await postService.findById(id);

  return res.status(200).json(post);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  await postService.remove(+id, +userId);
  return res.status(204).json();
};

module.exports = {
  create,
  findAll,
  findById,
  remove,
};