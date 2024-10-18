async function login(e){
    try{

   
    e.preventDefault();
    const email = e.target.email.value;
    const password =e.target.password.value;
    
    const loginDetails = {email,password};

    await axios.post('http://localhost:3000/user/login',loginDetails)
    .then(res=>{
        alert(res.data.message);
    })
    .catch(err=>{
        document.body.innerHTML += `<div style='color:red'>${err.message}</div>`
    })
     }catch(err){
        console.log(err);
     }
      
};