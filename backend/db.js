const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://divyanshsingh:Singh123@inotebook.kkg81.mongodb.net/inotebook?retryWrites=true&w=majority"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;