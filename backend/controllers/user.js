const User = require('../models/user');

function isStringInvallid(string){
    if(string==undefined || string.length===0){
        return true;
    }
    else{
        return false;
    }
};


const postUser = async(req,res,next)=>{
    try{

        const {name,email,password} = req.body;
        if(isStringInvallid(name)||isStringInvallid(email)||isStringInvallid(password)){
            return res.status(400).json({err:'Bad parameters.Something missing'});
        }

        

        await User.create({name,email,password});
       

        res.status(201).json({message:'successfully create new user'});

    }catch(err){
        res.status(500).json(err);
    }
}

module.exports = {postUser};