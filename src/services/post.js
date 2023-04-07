const { BlogPost, PostCategory, Category, User } = require('../models');
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

const findAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
    ],
  });
  
  return posts;
};

const findById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
    ],
  });

  if (!post) throw httpError.notFound('Post does not exist');
  
  return post;
};

const remove = async (id, userId) => {
  const post = await BlogPost.findByPk(id);

  if (!post) throw httpError.notFound('Post does not exist');
  if (post.userId !== userId) throw httpError.unauthorized('Unauthorized user');

  await BlogPost.destroy({ where: { id } });
};

module.exports = {
  create,
  findAll,
  findById,
  remove,
};