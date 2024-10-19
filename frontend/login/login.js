function login(e){
    e.preventDefault();
    const loginDetails = {
        email:e.target.email.value,
        password:e.target.password.value
    };

    axios.post('http://localhost:3000/user/login',loginDetails)
    .then(result=>{
        alert(result.data.message);
        window.location.href = '../expense/expense.html';
    })
    .catch(err=>{
        document.body.innerHTML += `<div style='color:red'>${err}</div>`;
    })
};