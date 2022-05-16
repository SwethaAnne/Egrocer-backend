
module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define('products', {
  
      product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
  
      product_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
  
      cost: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },

      image_url: {
          type: DataTypes.STRING,
          allowNull: false
      },

      category: {
        type: DataTypes.STRING,
        allowNull: false
      }
  
    }, {
      timestamps: true,
      underscored: true
    });
  
    return Products;
  };