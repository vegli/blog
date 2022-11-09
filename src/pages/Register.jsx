import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"


const Register = () => {

  const [inputs,setInputs] = useState ({
    username:"",
    email:"",
    password:"",
  })

  const[err,setError] = useState(null)

  const navigate = useNavigate()

  const handleChange = e =>{
    setInputs(prev=>({...prev,[e.target.name]: e.target.value}))
  }

  // ASYNC funkcija jer pravimo API request, npm install axios
  // API request 
  const handleSubmit = async e => {
    e.preventDefault()// nema refresh kad klikens na register
    try {
      await axios.post("/auth/register", inputs)
      navigate("/login")
    } catch(err){
      setError(err.response.data)
    }
  }

  return (
    <div className='auth'>
      <h1> REGISTER </h1>
      <form>
        <input required type="text" placeholder="username" name="username" onChange={handleChange}></input>
        <input required type="email" placeholder="email" name='email' onChange={handleChange}></input>
        <input required type="password" placeholder="password" name='password' onChange={handleChange}></input>
        <button onClick={handleSubmit}>Register</button>
       {err && <p>{err}</p> }
        <span> Imate nalog? <Link to="/login">Ulogujte se.</Link></span>
      </form>
    </div>
  )
}

export default Register