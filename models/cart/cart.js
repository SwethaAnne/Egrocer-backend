
module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('cart', {
  
      cart_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
  
      user_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
  
      products: {
        type: DataTypes.TEXT,
        allowNull: true
      }
  
    }, {
      timestamps: true,
      underscored: true
    });
  
    return Cart;
  };