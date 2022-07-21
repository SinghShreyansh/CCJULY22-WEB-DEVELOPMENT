const express = require('express');
const router = express.Router();
const {
  catchErrors
} = require('../../handlers/errorHandlers');
const {isAuthenticated} = require('../../handlers/passport');
const accountController = require('../../controllers/account/accountController');
//Dependencies
const multer = require('multer');

 //Multer DiskStorage Config
const diskStorage = multer.diskStorage({

  // destination of file
  destination: function (req , file , cb){
      cb(null, 'public/img');
  },

  filename: function (req, file , cb){
      cb(null , file.originalname);
  },
})

 //Create Multer Instance
 const upload = multer({ storage: diskStorage });


// router.post('/auth',accountController.addUserData)
router.post('/register',
upload.single('profileImg'),
accountController.addUserData)

router.post('/login',accountController.userLogin)
router.get('/login',accountController.getUserLogin)

router.get('/dashboard',accountController.getDashboard)

router.post('/getscore',accountController.getUserScore)

router.get('/quiz',accountController.getQuizPage)

router.get('/questions?',accountController.provideQuizQuestion)

router.post('/submit',accountController.submitResult)

router.get('/logout',isAuthenticated,
 accountController.logOut);

module.exports = router;