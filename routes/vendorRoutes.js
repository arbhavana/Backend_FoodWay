const vendorController = require('../controllers/vendorcontroller');

const express = require("express");
const router = express.Router();

router.post('/register', vendorController.vendorRegister);
router.post('/login', vendorController.vendorLogin);

module.exports = router;