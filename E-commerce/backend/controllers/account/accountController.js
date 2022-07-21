const passport = require('passport');
const mongoose = require('mongoose');
const bcryptjs= require('bcryptjs')
const UserSchema = require('../../models/UserSchema');
const ProductSchema = require('../../models/ProductSchema');
const validator = require('validator')
const Cryptr = require('cryptr');
const multer = require('multer');




const cryptr = new Cryptr('myNameisAtlantis');
// defining storage for image
const storage = multer.diskStorage({

  // destination of file
  destination: function (req , file , cb){
      cb(null, '../../public/img');
  },

  filename: function (req, file , cb){
      cb(null , file.originalname);
  },
})

// // upload parameters for multer
const upload = multer({
  storage:storage,
  limits:{
      fieldSize:1024*1024*3
  }
})


exports.addUserData = async(req,res,next)=>{

  // if user already exists
  const user = await UserSchema.findOne({email:req.body.email});

  if(user) return res.status(400).send("User already exists");

  // 1. validate
  // 2. password hash
  let paswrdHash = await bcryptjs.hash(req.body.password,10)

  //crypting password
  const crytedPassword =  cryptr.encrypt(req.body.password)

  const newData = {
      "name":req.body.name,
      "email": req.body.email,
      "password": paswrdHash,
      "dummy": crytedPassword,
  };

  await UserSchema.create(newData,(err,result)=>{

     if(err){
          return res.status(401).json({
              "type":"failure",
              "msg": err
          })
     }
     req.session.user = result;
     return res.status(201).json({
      "type":"success",
      "msg":result
    })

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
              res.status(200).json({
                "type":"success",
                "msg":data
              })
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

exports.uploadFile = async(req,res,next)=>{
  upload.single('product_img');
  next();
}

exports.addProducts = async(req,res,next)=>{

    console.log(req.body);

    const ProductData = {
         "title" : req.body.title,
         "rating" : req.body.rating,
         "price" : req.body.price,
         "image" : req.body.image,
    }

    ProductSchema.create(ProductData,(err,result)=>{
        if(err){
            //internal server error
            return res.status(200).json({
              "type":"failure",
              "msg":"Error occur during creating a product"
            })
        }
       res.status(200).json({
        "type":"success",
        "msg": "product added successfully"
       })
    })

}

exports.getProducts = async(req,res,next)=>{
    let products = await ProductSchema.find({})

    if(products.length){
      return res.status(200).json({
        "type":"success",
        msg:products
      })
    }else{
      return res.status(200).json({
        "type":"failure",
        "msg":products
      })
    }
}


exports.getUsers = async(req,res,next)=>{
  console.log("req")
  try{
    let users = await UserSchema.find({},{
      name:1,email:1
    })

    console.log(users.length)

    res.status(200).json({
      "type":"success",
      msg: users
    })
  }catch(err){
    res.status(200).json({
      "type":"failure",
      msg: err
    })
  }

}