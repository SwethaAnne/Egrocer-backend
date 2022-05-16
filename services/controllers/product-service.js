var db = require("../../models/db");

function addProduct(req, res) {

    try {

        if (!req.body.product_name) {
            throw new Error ("Product name is required");
        }

        if (!req.body.cost) {
            throw new Error ("Product cost is required");
        }

        if (!req.body.image_url) {
            throw new Error ("Image url is required");
        }

        if (!req.body.category) {
            throw new Error ("Product category is required");
        }

        var new_product = {
            product_name: req.body.product_name,
            cost: req.body.cost,
            image_url: req.body.image_url,
            category: req.body.category
        };

        db.Products.create(new_product, {
            returning: true
        }).then((created_product) => {
            console.log(created_product, 'created product');
            return res.status(200).json({
                success: true,
                product: created_product
            });
        }).catch(err => {
            console.log(err, 'err while creating product');
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

function editProduct(req, res) {

    try {

        if (!req.body.product_id) {
            throw new Error ("Product id is required");
        }

        var edit_body = {};

        if (req.body.product_name) {
            edit_body["product_name"] = req.body.product_name;
        }

        if (req.body.cost) {
            edit_body["cost"] = req.body.cost;
        }

        if (req.body.image_url) {
            edit_body["image_url"] = req.body.image_url;
        }

        if (req.body.category) {
            edit_body["category"] = req.body.category;
        }

        db.Products.update(edit_body, {
            where: {
                product_id: req.body.product_id
            },
            returning: true
        }).then((updated_product) => {
            console.log(updated_product, 'updated product');
            return res.status(200).json({
                success: true,
                product: updated_product
            });
        }).catch(err => {
            console.log(err, 'err while updating product');
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

function getAllProducts(req, res) {

    try {

        var searchQuery = {};

        if (req.body.product_name) {
            searchQuery["product_name"] = {
                [db.Sequelize.Op.like]: `%${req.body.product_name}%`
            };
        }

        if (req.body.category && req.body.category != 'all') {
            searchQuery["category"] = req.body.category;
        }

        db.Products.findAll({
            where: searchQuery
        }).then((products) => {
            console.log(products.length, 'products found');
            return res.status(200).json({
                success: true,
                products
            });
        }).catch(err => {
            console.log(err, 'err while getting products');
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

function getProduct(req, res) {

    try {

        if (!req.query.product_id) {
            throw new Error("Product id is required");
        }

        db.Products.findAll({
            where: {
                product_id: req.query.product_id
            }
        }).then((products) => {
            console.log(products.length, 'products found');
            return res.status(200).json({
                success: true,
                products: products[0]
            });
        }).catch(err => {
            console.log(err, 'err while getting products');
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

function deleteProduct(req, res) {

    try {

        if (!req.query.product_id) {
            throw new Error("Product id is required");
        }

        db.Products.destroy({
            where: {
                product_id: req.query.product_id
            }
        }).then((products) => {
            console.log(products, 'products deleted');
            return res.status(200).json({
                success: true,
                message: "Product deleted successfully!"
            });
        }).catch(err => {
            console.log(err, 'err while deleting product');
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
    addProduct,
    editProduct,
    getAllProducts,
    getProduct,
    deleteProduct
}