const form = document.getElementById('form');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const obj = {
        name,email,password
    }

    console.log(obj);
    axios.post('http://localhost:3000/user/signup',obj);
});