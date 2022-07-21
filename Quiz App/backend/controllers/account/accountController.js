const passport = require('passport');
const mongoose = require('mongoose');
const bcryptjs= require('bcryptjs')
const UserSchema = require('../../models/UserSchema');
const TotalScoreSchema = require('../../models/TotalScoreSchema');
const validator = require('validator')
const Cryptr = require('cryptr');
const multer = require('multer');
const xlsx = require('xlsx')




const cryptr = new Cryptr('myNameisAtlantis');
// defining storage for image
// const storage = multer.diskStorage({

// //   // destination of file
//   destination: function (req , file , cb){
//       cb(null, '../../public/img');
//   },

//   filename: function (req, file , cb){
//       cb(null , file.originalname);
//   },
// })

// // upload parameters for multer
// const upload = multer({
//   storage:storage,
//   limits:{
//       fieldSize:1024*1024*3
//   }
// })


// ------------------------------- LOgin and Registration page REST APIs are here 👇----------------------
exports.getUserLogin = async(req,res,next)=>{
  return res.status(200).render('login/login.pug');
}

exports.addUserData = async(req,res,next)=>{

  // if user already exists
  const user = await UserSchema.findOne({email:req.body.email});

  if(user) return res.status(400).send("User already exists");

  // 1. validate
  if(req.body.password!=req.body.confirmpassword){
    return res.status(400).send("Password not matched")
  }
  // 2. password hash

    let paswrdHash = await bcryptjs.hash(req.body.password,10)

  //crypting password
  const crytedPassword =  cryptr.encrypt(req.body.password)

  const newData = {
      "name":req.body.name,
      "email": req.body.email,
      "password": paswrdHash,
      "dummy": crytedPassword,
      "profileImg" : req.file.originalname
  };

  await UserSchema.create(newData,(err,result)=>{

     if(err){
          return res.status(401).json({
              "type":"failure",
              "msg": err
          })
     }
     req.session.user = result;
     res.status(200).redirect('/account/dashboard')
    //  return res.status(201).json({
    //   "type":"success",
    //   "msg":result
    // })

  })
  // 3. data base add kardo
  // 4. render
  return;

}

exports.userLogin =async(req,res,next)=>{
  const data = await UserSchema.findOne({"email":req.body.email});

  if(data){
      const passwordResult = await bcryptjs.compare(req.body.password, data.password)
      if(passwordResult){
              req.session.user = data;
              res.status(200).redirect('/account/dashboard')

              // res.status(200).json({
              //   "type":"success",
              //   "msg":data
              // })
      }else{
          return res.status(401).json({
              "type":"failure",
              "msg":"Plz enter correct password",
          })
      }
  }else{
      return res.status(401).json({
          "type":"failure",
          "msg":"user not found",
      })
  }

}

// -------------------------------------Dashboard page code is here 👇 -----------------------------------------
exports.getDashboard = async(req,res,next)=>{
    res.status(200).render('dashboard/dashboard.pug');
}

exports.getUserScore = async(req,res,next)=>{
  let userPresent = await TotalScoreSchema.find({user : mongoose.Types.ObjectId(req.body.userId)})
  return res.status(200).json({
    "type":"success",
    "highestscore" : userPresent.length?userPresent[0].highestscore : 0,
    "totalattempt" : userPresent.length?userPresent[0].totalattempt : 0,
  })
}

// ------------------------------------ Quiz page REST APIs here 👇 --------------------------------------------
exports.getQuizPage = async(req,res,next)=>{
  res.status(200).render('quizpage/quizpage.pug');
}

exports.provideQuizQuestion = async(req,res,next)=>{
     var Qno = req.query.number;

     var wb = xlsx.readFile('excelSheet/Book1.xlsx');

     var ws = wb.Sheets["QuizQuestion"];

     var data = xlsx.utils.sheet_to_json(ws);

     var QuesData = data.find(data =>{
     if(data.SrNo == Qno.toString())  return data;
     })

     res.status(200).json({
      type:"success",
      data :  {
        "SrNo": QuesData.SrNo,
        "Question": QuesData.Question,
        "CorrectAnswer1" : QuesData.CorrectAnswer1,
        "WrongAnswer1" : QuesData.WrongAnswer1,
        "WrongAnswer2" : QuesData.WrongAnswer2,
        "WrongAnswer3" : QuesData.WrongAnswer3,
        "Solution" : QuesData.Solution
       }
     })
}

exports.submitResult = async(req,res,next)=>{
  let userPresent = await TotalScoreSchema.find({user : mongoose.Types.ObjectId(req.body.userId)})

  if(!userPresent.length){
    await TotalScoreSchema.create({
      highestscore:parseInt(req.body.currentscore),
      currentscore:parseInt(req.body.currentscore),
      totalattempt : 1,
      user : mongoose.Types.ObjectId(req.body.userId)
    })
  }else{
    await TotalScoreSchema.findOneAndUpdate({user : mongoose.Types.ObjectId(req.body.userId)},{
      highestscore:Math.max(userPresent[0].highestscore,parseInt(req.body.currentscore)),
      currentscore:parseInt(req.body.currentscore),
      totalattempt : (parseInt(userPresent[0].totalattempt)+1),
    })
  }

  res.status(200).json({
    type:"success"
  })
}


// -------------------------------- logout code is here 👇 ----------------------------------------------------
exports.logOut = async(req,res,next)=>{
  req.session.user = null;

  res.status(200).redirect('/account/login');

}