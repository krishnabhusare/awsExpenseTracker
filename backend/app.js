const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json({extended:false}));


app.post('/user/signup',async(req,res,next)=>{
    try{

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const data = {name,email,password};
        console.log(data);

    }catch(err){
        console.log(err);
    }
});

app.listen(3000);