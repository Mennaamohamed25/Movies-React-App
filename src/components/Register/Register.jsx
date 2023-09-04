import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom'; 



export default function Register() {
//USESTATE
const [user, setUser] = useState({
  'first_name':'',
  'last_name':'',
  'age':'',
  'email':'',
  'password':'',
})
//USESTATE
const [errorMsg, setErrorMsg] = useState('')
const [errorValid, setErrorValid] = useState([])
//USENAVIGATE
let navigate = useNavigate();
//Registration Button
let submitFormData= async (e)=>{
  e.preventDefault(); //to prevent form default
let validationResponse=validatonData();
if (validationResponse.error) {
  setErrorValid(validationResponse.error.details)
}
else{
  let {data} = await axios.post(
    "https://movies-api.routemisr.com/signup",user
  );
  if (data.message==='success') {
    goToLogin()
  }
  else{
    setErrorMsg(data.message)
  }
  // console.log(data);
    // alert('ok')
   }
}
//Inputs value
let getInputValue=(e)=>{
  let myUser={...user};
  myUser[e.target.name]=e.target.value;
  setUser(myUser);
 
  // console.log(myUser);
// console.log(e.target.value);
}
//Navigation function
let goToLogin=()=>{
  navigate('/login')
}

//VALIDATION
let validatonData =()=>{
  const schema =Joi.object({
    first_name:Joi.string().alphanum().required().min(3).max(30),
    last_name:Joi.string().alphanum().required().min(3).max(30),
    age:Joi.number().required().min(20).max(60),
    email:Joi.string().required().email({tlds:{allow:['com' , 'net']}}),
    password:Joi.string().required().pattern(new RegExp(/^[a-z][0-9]{3}$/))
  })
  return schema.validate(user , {abortEarly:false});
}

  return (
    <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
             
            </Helmet>
   <div className="py-5 w-75 m-auto">
   <h2>Registeration Form</h2>
{   errorValid.map((error , index)=>
  <div key={index} className="alert alert-danger p-2">{error.message}</div>
)}
   {errorMsg?<div className="alert alert-danger p-2">{errorMsg}</div>:''}
   <form onSubmit={submitFormData }>
    <div className="input-data py-3">
    <label htmlFor="first_name">First Name</label>
    <input onChange={getInputValue} type="text" className='form-control my-2' name='first_name' />
    </div>
    <div className="input-data py-3">
    <label htmlFor="last_name">Last Name</label>
    <input onChange={getInputValue} type="text" className='form-control my-2' name='last_name' />
    </div>
    <div className="input-data py-3">
    <label htmlFor="age">Age</label>
    <input onChange={getInputValue} type="number" className='form-control my-2' name='age' />
    </div>
    <div className="input-data py-3">
    <label htmlFor="email">Email</label>
    <input onChange={getInputValue} type="email" className='form-control my-2' name='email' />
    </div>
    <div className="input-data py-3 ">
    <label htmlFor="password">Password</label>
    <input onChange={getInputValue} type="password" className='form-control my-2' name='password' />
    </div>
    <button className='btn btn-info float-end my-3'>Register</button>
    <div className="clear-fix"></div>
   </form>
   </div>
    </>
  )
}
