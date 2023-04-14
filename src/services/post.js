const { BlogPost, PostCategory, Sequelize, sequelize } = require('../models');
const httpError = require('../utils/httpError');

const create = async (title, content, categoriesIds, userId) => {
  const result = await sequelize.transaction(async (transaction) => {
    const post = await BlogPost.create({ title, content, userId }, { transaction });

    await PostCategory.bulkCreate(
      categoriesIds.map((categoryId) => ({ categoryId, postId: post.id })),
      { transaction },
    );

    return post;
  });

  return result;
};

const findAll = async () => {
  const posts = await BlogPost.scope('withUserAndCategories').findAll();

  return posts;
};

const findById = async (id) => {
  const post = await BlogPost.scope('withUserAndCategories').findByPk(id);

  if (!post) throw httpError.notFound('Post does not exist');

  return post;
};

const remove = async (id, userId) => {
  const post = await BlogPost.findByPk(id);

  if (!post) throw httpError.notFound('Post does not exist');
  if (post.userId !== userId) throw httpError.unauthorized('Unauthorized user');

  await BlogPost.destroy({ where: { id } });
};

const update = async (id, title, content, userId) => {
  if (id !== userId) throw httpError.unauthorized('Unauthorized user');

  const editedPost = await BlogPost.update({ title, content }, {
    where: { id },
  });

  if (!editedPost) throw httpError.notFound('Post does not exist');

  return BlogPost.scope('withUserAndCategories').findByPk(id);
};

const search = async (q) => {
  const posts = await BlogPost.scope('withUserAndCategories').findAll({
    where: {
      [Sequelize.Op.or]: [
        { title: { [Sequelize.Op.substring]: q } },
        { content: { [Sequelize.Op.substring]: q } },
      ],
    },
  });
  return posts;
};

module.exports = {
  create,
  findAll,
  findById,
  remove,
  update,
  search,
};