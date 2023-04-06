const UserSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  },
    {
      tableName: 'users',
      underscored: true,
      timestamps: false
    });

  UserTable.associate = ({ BlogPost }) => {
    UserTable.hasMany(BlogPost, {
      foreignKey: 'userId',
      as: 'posts'
    })
  }

  return UserTable;
};

module.exports = UserSchema;
