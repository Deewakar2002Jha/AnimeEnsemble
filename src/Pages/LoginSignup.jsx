import React ,{ useState } from 'react'
import './CSS/LoginSignup.css'
// import { useState } from 'react'
export const LoginSignup = () => {
  //now we are using the usestate method so that we use 
  // same page with for both the work signup and login

  const [state,setState] = useState ("Login");

  //now we creating a state variable to save our input data
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:"",
  })
  // now we are creating the change halderfunction so
  const changeHandler = (e) =>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }
  
  //now we are connect the api from backend to frontend for login and signup
 
  const login = async () =>{
    console.log("Login Function Executed",formData)
  }
  const signup = async () =>{
    console.log("Sign UP Function Executed",formData)
  }

  return (
    <div className='loginsignup'>
        <div className="loginsignup-container">
          <h1>{state}</h1>
          <div className="loginsignup-fields">
            {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name'/>:<></>}
            <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Your Email Address'/>
            <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password'/>
          </div>
          <button onClick={()=>{state==="Login"?login():signup()}} >Continue</button>
          {state==="Sign Up"?<p className="loginsignup-login">Already have an account?<span onClick={()=>{setState("Login")}}> Login here </span></p>:
          <p className="loginsignup-login">Create an account?<span onClick={()=>{setState("Sign Up")}} > Click Her </span></p>
          }
          <div className="loginsignup-agree">
            <input type="checkbox" name='' id=''></input>
            <p> By continuing , i agree to the terms of use & privacy pilicy. </p>
          </div>
        </div>
    </div>
  )
}
export default LoginSignup