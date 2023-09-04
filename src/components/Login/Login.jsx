import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom'; 

export default function Login({saveUserData}) {
  //USESTATE
const [user, setUser] = useState({
  
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
    "https://movies-api.routemisr.com/signin",user
  );
  if (data.message==='success') {
    localStorage.setItem('token',data.token);
    saveUserData();
    goToHome();
  }
  else{
    setErrorMsg(data.message)
  }
  // console.log(data);
    // alert('ok')
   }
}
//VALIDATION
let validatonData =()=>{
  const schema =Joi.object({
   
    email:Joi.string().required().email({tlds:{allow:['com' , 'net']}}),
    password:Joi.string().required().pattern(new RegExp(/^[a-z][0-9]{3}$/))
  })
  return schema.validate(user , {abortEarly:false});
}
let goToHome=()=>{
  navigate('/')
}
//Inputs value
let getInputValue=(e)=>{
  let myUser={...user};
  myUser[e.target.name]=e.target.value;
  setUser(myUser);
 
  // console.log(myUser);
// console.log(e.target.value);
}
  return (
    <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
             
            </Helmet>
       <div className="py-5 w-75 m-auto">
   <h2>Registeration Form</h2>
{   errorValid.map((error , index)=>
  <div key={index} className="alert alert-danger p-2">{error.message}</div>
)}
   {errorMsg?<div className="alert alert-danger p-2">{errorMsg}</div>:''}
   <form onSubmit={submitFormData }>
 
    <div className="input-data py-3">
    <label htmlFor="email">Email</label>
    <input onChange={getInputValue} type="email" className='form-control my-2' name='email' />
    </div>
    <div className="input-data py-3">
    <label htmlFor="password">Password</label>
    <input onChange={getInputValue} type="password" className='form-control my-2' name='password' />
    </div>
    <button className='btn btn-info float-end my-3'>Login</button>
    <div className="clear-fix"></div>
   </form>
   </div>
    </>
  )
}
