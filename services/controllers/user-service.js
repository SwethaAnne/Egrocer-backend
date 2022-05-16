var db = require("../../models/db");

async function addUser(req, res) {

    try {
        
        if (!req.body.user_name) {
            throw new Error ("Name is required");
        }

        if (!req.body.user_email) {
            throw new Error ("Email is required");
        }

        if (!req.body.mobile) {
            throw new Error ("Mobile number is required");
        }

        if (!req.body.address) {
            throw new Error ("Address is required");
        }

        var new_user = {
            user_name: req.body.user_name,
            user_email: req.body.user_email,
            mobile: req.body.mobile,
            address: req.body.address
        };

        var t = await db.sequelize.transaction();

        db.Users.create(new_user, {
            returning: true,
            transaction: t
        }).then((created_user) => {
            console.log(created_user, 'created user');
            var new_cart = {
                user_id: created_user.user_id,
                products: "[]"
            };
            db.Cart.create(new_cart, {
                returning: true,
                transaction: t
            }).then((created_cart) => {
                console.log(created_cart, 'created cart');
                t.commit();
                return res.status(200).json({
                    success: true,
                    user: created_user,
                    cart: created_cart
                });
            }).catch(err => {
                console.log(err, 'err while creating cart');
                t.rollback();
                return res.status(500).json({
                    success: false,
                    error_message: err
                });
            })
        }).catch(err => {
            console.log(err, 'err while creating user');
            t.rollback();
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
        })
    }
}

function editUser (req, res) {

    try {

        console.log(req.body, 'req body');

        if (!req.body.user_id) {
            throw new Error ("User id is required");
        }

        var edit_user = {};

        if (req.body.user_name) {
            edit_user["user_name"] = req.body.user_name;
        }

        if (req.body.mobile) {
            edit_user["mobile"] = req.body.mobile;
        }

        if (req.body.address) {
            edit_user["address"] = req.body.address;
        }

        if (req.body.user_email) {
            edit_user["user_email"] = req.body.user_email;
        }

        console.log(edit_user, 'edit user');

        db.Users.upsert(edit_user, {
            where: {
                user_email: req.body.user_email
            },
            returning: true
        }).then((updated_user) => {
            console.log(updated_user, 'updated user');
            return res.status(200).json({
                success: true,
                user: updated_user[0]
            });
        }).catch(err => {
            console.log(err, 'err while updating user');
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

function getUser (req, res) {

    try {

        if (!req.query.user_email) {
            throw new Error ("User email is required");
        }

        console.log(req.query.user_email, 'user email');

        db.Users.findAll({
            where: {
                user_email: req.query.user_email
            }
        }).then((users) => {
            console.log(users, 'user');
            return res.status(200).json({
                success: true,
                user: users[0]
            });
        }).catch(err => {
            console.log(err, 'err while getting user');
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

function deleteUser (req, res) {

    try {

        if (!req.query.user_id) {
            throw new Error ("User id is required");
        }

        db.Users.destroy({
            where: {
                user_id: req.query.user_id
            }
        }).then(deleted_user => {
            console.log(deleted_user, 'deleted user');
            return res.status(200).json({
                success: true,
                message: "User deleted successfully."
            });
        }).catch(err => {
            console.log(err, 'err while deleting user');
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

module.exports = {
    addUser,
    editUser,
    getUser,
    deleteUser
}