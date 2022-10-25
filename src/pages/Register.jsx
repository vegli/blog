import React from 'react'
import { Link } from 'react-router-dom'


const Register = () => {
  return (
    <div className='auth'>
      <h1> REGISTER </h1>
      <form>
        <input required type="text" placeholder="username"></input>
        <input required type="email" placeholder="email"></input>
        <input required type="password" placeholder="password"></input>
        <button>Register</button>
        <p> This is an error!</p>
        <span> Imate nalog? <Link to="/login">Ulogujte se.</Link></span>
      </form>
    </div>
  )
}

export default Register