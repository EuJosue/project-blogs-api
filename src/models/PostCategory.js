const PostCategorySchema = (sequelize, DataTypes) => {
  const PostCategoryTable = sequelize.define('PostCategory', {},
    {
      tableName: 'posts_categories',
      underscored: true,
      timestamps: false
    });

  PostCategoryTable.associate = ({BlogPost, Category}) => {
    BlogPost.belongsToMany(Category, {
      as: 'categories',
      foreignKey: 'postId',
      otherKey: 'categoryId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      through: PostCategoryTable,
    });

    Category.belongsToMany(BlogPost, {
      as: 'posts',
      foreignKey: 'categoryId',
      otherKey: 'postId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      through: PostCategoryTable,
    });
  }

  return PostCategoryTable;
};

module.exports = PostCategorySchema;