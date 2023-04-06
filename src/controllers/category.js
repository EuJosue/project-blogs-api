const categoryService = require('../services/category');

const create = async (req, res) => {
  const { name } = req.body;
  
  const category = await categoryService.create(name);

  return res.status(201).json(category);
};

const findAll = async (req, res) => {
  const categories = await categoryService.findAll();

  return res.status(200).json(categories);
};

module.exports = {
  create,
  findAll,
};