async function signup(e) {
    try{
        e.preventDefault();
        const name= e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        const signupDetails = {
            name,email,password
        };

        console.log(signupDetails);
        const response = await axios.post('http://localhost:3000/user/signup',signupDetails)
        if(response.status===201){
            window.location.href = '../login/login.html' ;
        }
        else{
            throw new Error('failed to login');
        }

    }catch(err){
          document.body.innerHTML  += `<div style='color:red'>${err}</div>`;
    }
    
}