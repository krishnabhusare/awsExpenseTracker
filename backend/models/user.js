const Sequelize = require('sequelize');

const sequelize =require('../util/user');

const User = sequelize.define('user',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    name:Sequelize.STRING,
    email:{
        type:Sequelize.STRING,
        unique:true
    },
    password:Sequelize.STRING
});

module.exports = User;