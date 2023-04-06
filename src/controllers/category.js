const categoryService = require('../services/category');

const create = async (req, res) => {
  const { name } = req.body;
  
  const category = await categoryService.create(name);

  return res.status(201).json(category);
};

module.exports = {
  create,
};