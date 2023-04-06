const BlogPostSchema = (sequelize, DataTypes) => {
  const BlogPostTable = sequelize.define('BlogPost', {
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

  BlogPostTable.associate = ({ User }) => {
    BlogPostTable.belongsTo(User, {
      foreignKey: 'userId',
      as: 'author'
    })
  }

  return BlogPostTable;
};

module.exports = BlogPostSchema;