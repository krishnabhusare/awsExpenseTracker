const Sequelize = require('sequelize');
const sequelize =require('../util/user');

const Expense = sequelize.define('expense',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    amount:Sequelize.INTEGER,
    description:Sequelize.STRING,
    category:Sequelize.STRING
});

module.exports = Expense;