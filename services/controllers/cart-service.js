var db = require("../../models/db");

function addProductToCart (req, res) {

    try  {

        if (!req.body.user_id) {
            throw new Error ("User id is required");
        }

        if (!req.body.product) {
            throw new Error ("Product is required");
        }

        db.Cart.findAll({
            where: {
                user_id: req.body.user_id
            }
        }).then((user_cart) => {
            let cart = user_cart[0].dataValues;
            let existing_products = JSON.parse(cart.products);
            existing_products.push(req.body.product);
            cart.products = JSON.stringify(existing_products);
            db.Cart.update(cart, {
                where: {
                    user_id: req.body.user_id
                },
                returning: true
            }).then((updated_cart) => {
                console.log(updated_cart, 'updated cart');
                return res.status(200).json({
                    success: true,
                    cart: updated_cart[1][0]
                });
            }).catch((err) => {
                console.log(err, 'err while updating cart');
                return res.status(500).json({
                    success: false,
                    error_message: err
                });
            })
        }).catch(err => {
            console.log(err, 'err while getting cart');
            return res.status(500).json({
                success: false,
                error_message: err
            });
        })

    }
    catch (err) {
        console.log(err,  'err caught');
        return res.status(500).json({
            success: false,
            error_message: err.message
        });
    }
}

function deleteProductFromCart (req, res) {
    
    try {

        if (!req.query.user_id) {
            throw new Error ("Cart id is required");
        }

        if (!req.query.product_id) {
            throw new Error ("Product id is required");
        }

        db.Cart.findAll({
            where: {
                user_id: req.query.user_id
            }
        }).then((user_cart) => {
            let cart = user_cart[0].dataValues;
            let existing_products = JSON.parse(cart.products);
            let product_to_be_removed_index = -1;
            existing_products.map((product, index) => {
                if (product.product_id === req.query.product_id) {
                    product_to_be_removed_index = index;
                }
            });
            existing_products.splice(product_to_be_removed_index, 1);
            cart.products = JSON.stringify(existing_products);
            db.Cart.update(cart, {
                where: {
                    user_id: req.query.user_id
                },
                returning: true
            }).then((updated_cart) => {
                console.log(updated_cart, 'updated cart');
                return res.status(200).json({
                    success: true,
                    cart: updated_cart[1][0]
                });
            }).catch((err) => {
                console.log(err, 'err while updating cart');
                return res.status(500).json({
                    success: false,
                    error_message: err
                });
            })
        }).catch(err => {
            console.log(err, 'err while getting cart');
            return res.status(500).json({
                success: false,
                error_message: err
            });
        })

    }
    catch (err) {
        console.log(err, 'err caught');
        return res.status(500).json({
            success: false,
            error_message: err.message
        });
    }
}

function getProductsInCart (req, res) {

    try {

        if (!req.query.user_id) {
            throw new Error ("Cart id is required");
        }

        db.Cart.findAll({
            where: {
                user_id: req.query.user_id
            }
        }).then((user_cart) => {
            console.log(user_cart, 'user_cart');
            return res.status(200).json({
                success: true,
                cart: user_cart
            })
        }).catch(err => {
            console.log(err, 'err while getting cart');
            return res.status(500).json({
                success: false,
                error_message: err
            })
        })

    }
    catch (err) {
        console.log(err, 'err caught');
        return res.status(500).json({
            success: false,
            error_message: err.message
        });
    }

}

module.exports = {
    addProductToCart,
    deleteProductFromCart,
    getProductsInCart
}