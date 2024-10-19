const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./util/user');
const User = require('./models/user');
const { where } = require('sequelize');
const bcrypt = require('bcrypt');
const Expense = require('./models/expense');


const app = express();
app.use(bodyParser.json({ extended: false }));
app.use(cors());

app.post('/user/signup', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const saltround = 10;
        bcrypt.hash(password,saltround,async(err,hash)=>{
            await User.create({ name, email, password:hash });
        res.status(201).json({ success: true, message: 'signup successfull' });

        })

        


    } catch (err) {
        res.status(500).json({ success: false, message: 'fail to signup' });
    }
});

app.post('/user/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        await User.findAll({ where: { email } })
        .then(result=>{
            bcrypt.compare(password,result[0].password,(err,result)=>{
                if(result==true){
                   res.status(201).json({message:'logged in successfull'});
                }
                else{
                    res.status(400).json({message:'password doesnt match'});
                }

            })
            
        })
        



    } catch (err) {
        res.status(500).json({message:err});
    }


});

app.post('/expense/add-expense',async(req,res,next)=>{
    try{
        const {amount,description,category}=req.body;
        const expense = await Expense.create({amount,description,category});
        res.status(201).json({expense});

    }catch(err){
        res.status(500).json({message:err});
    }
});

app.get('/expense/get-expense',async(req,res,next)=>{
    try{
        const allExpense = await Expense.findAll();
        res.status(200).json({allExpense});
        


    }catch(err){
        res.status(500).json(err);
    }
});

app.delete('/expense/delete-expense/:id',async(req,res,next)=>{
    try{
        const eId = req.params.id;
        Expense.destroy({where:{id:eId}});
        res.status(200).json({message:'deleted expense'});
        


    }catch(err){
        res.status(500).json(err);
    }
})




sequelize.sync()
    .then(result => {
        app.listen(3000);
    })


