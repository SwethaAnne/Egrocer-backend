const Sequelize = require('sequelize');

const sequelize = new Sequelize('egrocery', 'swetha', '2Mozbrpq39$', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    schema: 'public',
    define: {
        underscored: true
    },
    logging: false
});

sequelize.authenticate().then(() => {
    console.log("Database Connected 😎");
}).catch(err => {
    console.error('\nUnable to connect to the database 🔥\n');
    console.error(err);
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Sequelize.Op;

db.Users = require('./user/user')(db.sequelize, db.Sequelize);
db.Products = require('./product/product')(db.sequelize, db.Sequelize);
db.Cart = require('./cart/cart')(db.sequelize, db.Sequelize);

db.Users.hasOne(db.Cart, { foreignKey: 'user_id', onDelete: 'cascade' });
db.Cart.belongsTo(db.Users, { foreignKey: 'user_id' });

module.exports = db;