const BlogPostSchema = (sequelize, DataTypes) => {
  const BlogPostTable = sequelize.define('BlogPost', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  },
    {
      tableName: 'blog_posts',
      underscored: true,
      timestamps: false
    });

  BlogPostTable.associate = (models) => {
    const { User, Category } = models;

    BlogPostTable.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user'
    });

    BlogPostTable.addScope('withUserAndCategories', () => ({
        include: [
          { model: Category, as: 'categories', through: { attributes: [] } },
          { model: User.scope('withoutPassword'), as: 'user' },
        ],
      }));
  }

  return BlogPostTable;
};

module.exports = BlogPostSchema;