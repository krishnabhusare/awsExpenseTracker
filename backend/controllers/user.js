const User = require('../models/user');
const bcrypt = require('bcrypt');

function isStringInvallid(string){
    if(string==undefined || string.length===0){
        return true;
    }
    else{
        return false;
    }
};


const signup = async(req,res,next)=>{
    try{

        const {name,email,password} = req.body;
        if(isStringInvallid(name)||isStringInvallid(email)||isStringInvallid(password)){
            return res.status(400).json({err:'Bad parameters.Something missing'});
        }
        const saltrounds = 10;

        bcrypt.hash(password,saltrounds,async(err,hash)=>{
            console.log(err);
            await User.create({name,email,password:hash});
            res.status(201).json({message:'successfully create new user'});
        })

       }catch(err){
        res.status(500).json(err);
    }
};

const login = async(req,res,next)=>{
    try{

       const {email,password} = req.body;
       if(isStringInvallid(email) || isStringInvallid(password)){
        return res.status(400).json({message:'Email id or password is missing' , success:false});
       }

       const user = await User.findAll({where:{email}})
       if(user.length>0){
           bcrypt.compare(password,user[0].password,(err,result)=>{
            if(err){
               throw new Error('something went wrong');
                
            }
            if(result ==true){
                return res.status(200).json({message:'user logged in successfully',success:true});
            }
            else{
                return res.status(400).json({message:'password is inccorect', success:false });
            }
            
           })
               
           }else{
           res.status(404).json({success:false,message:'user does not exist'});
       }
       

    }catch(err){
       res.status(500).json({message:err,success:false});
    }
};

module.exports = {signup,login};