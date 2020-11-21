const mongoose = require('mongoose');

//Config for connet to database of  mongoDB
mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true}, (err) => {
    if(!err){
        console.log("Database connected");
    }else{
        console.log("Database error:", err);  
    }
       
    
});