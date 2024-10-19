function expense(e){
    e.preventDefault();
    const expensedetails = {
        amount:e.target.amount.value,
        description:e.target.description.value,
        category:e.target.category.value
    };

    axios.post('http://localhost:3000/expense/add-expense',expensedetails)
    .then(result=>{
        
        addNewExpenseToUI(result.data.expense);
       

    })
    .catch(err=>{
        document.body.innerHTML += `<div style='color:red'>${err}</div>`;
    })
};

window.addEventListener('load',()=>{
    axios.get('http://localhost:3000/expense/get-expense')
    .then(result=>{
        result.data.allExpense.forEach(element => {
            addNewExpenseToUI(element);
        });
    })
});

function addNewExpenseToUI(expense){
    const parentElement = document.getElementById('listOfExpense');
    const expenseElemId = `expense-${expense.id}`;
    parentElement.innerHTML +=`
    <li id=${expenseElemId}>
        ${expense.amount}--${expense.category}--${expense.description}
        <button onclick='deleteexpense(event,${expense.id})'>
        Delete Expense
        </button>
    </li>`


};

function deleteexpense(e,expenseid){
   axios.delete(`http://localhost:3000/expense/delete-expense/${expenseid}`)
   .then(response=>{
    romoveExpenseFromUI(expenseid);
   })
   .catch(err=>{
    showError(err);
   })
   
}

function romoveExpenseFromUI(expenseid){
    const expenseElemId = `expense-${expenseid}`;
    document.getElementById(expenseElemId).remove();
}