var express = require('express');

var router = express.Router();

var userCtrl = require("../controllers/user-service");

router.post('/add', userCtrl.addUser);
router.put('/edit', userCtrl.editUser);
router.delete('/delete', userCtrl.deleteUser);
router.get('/user', userCtrl.getUser);

module.exports = router;