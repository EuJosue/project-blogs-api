const { BlogPost, PostCategory, Category } = require('../models');
const httpError = require('../utils/httpError');

const create = async (title, content, categoriesIds, userId) => {
  const categories = await Promise.all(categoriesIds.map((categoryId) => (
    Category.findByPk(categoryId)
  )));

  categories.forEach((category) => {
    if (!category) throw httpError.badRequest('one or more "categoryIds" not found');
  });

  const post = await BlogPost
    .create({ title, content, userId, published: new Date(), updated: new Date() });

  await Promise.all(categoriesIds.map((categoryId) => (
    PostCategory.create({ postId: post.id, categoryId })
  )));

  return post;
};

module.exports = {
  create,
};