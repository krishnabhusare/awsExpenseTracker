const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/user');
const sequelize = require('./models/user');


const app = express();
app.use(cors());
app.use(bodyParser.json({extended:false}));


app.post('/user/signup',async(req,res,next)=>{
    try{

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        

        const signupdata = await User.create({name:name,email:email,password:password});
       

        res.status(201).json({signupdata:signupdata});

    }catch(err){
        res.status(403).json(err);
    }
});

sequelize.sync()
.then(res=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
})