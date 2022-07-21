const express = require('express');
const router = express.Router();
const {
  catchErrors
} = require('../../handlers/errorHandlers');
const {isAuthenticated} = require('../../handlers/passport');
const accountController = require('../../controllers/account/accountController');


router.post('/addproduct',accountController.addProducts)

router.post('/auth',accountController.addUserData)

router.post('/login',accountController.userLogin)

router.get('/getproducts',accountController.getProducts)

router.get('/getusers',accountController.getUsers)

module.exports = router;