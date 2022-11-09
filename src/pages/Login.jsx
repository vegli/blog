import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

const Login = () => {

  const [inputs,setInputs] = useState ({
    username:"",
    password:"",
  })

  const[err,setError] = useState(null)

  const navigate = useNavigate()

  const {login} = useContext(AuthContext);

  const handleChange = e =>{
    setInputs(prev=>({...prev,[e.target.name]: e.target.value}))
  }

  // ASYNC funkcija jer pravimo API request, npm install axios
  // API request 
  const handleSubmit = async e => {
    e.preventDefault()// nema refresh kad klikens na login
    try {
      await login(inputs)
      navigate("/")
    } catch(err){
      setError(err.response.data)
    }
  }

  return (
    <div className='auth'>
      <h1> LOGIN </h1>
      <form>
        <input required type="text" placeholder="username" name="username" onChange={handleChange}></input>
        <input required type="password" placeholder="password" name="password" onChange={handleChange}></input>
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span> Nemate nalog? <Link to="/register">Registruj se.</Link></span>
      </form>
    </div>
  )
}

export default Login