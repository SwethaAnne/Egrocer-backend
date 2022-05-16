
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
  
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
  
      user_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
  
      user_email: {
        type: DataTypes.STRING,
        allowNull: false
      },

      address: {
          type: DataTypes.STRING,
          allowNull: false
      },

      mobile: {
          type: DataTypes.STRING,
          allowNull: false
      }
  
    }, {
      timestamps: true,
      underscored: true
    });
  
    return Users;
  };