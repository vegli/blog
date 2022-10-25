import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='auth'>
      <h1> LOGIN </h1>
      <form>
        <input required type="text" placeholder="username"></input>
        <input required type="password" placeholder="password"></input>
        <button>Login</button>
        <p> This is an error!</p>
        <span> Nemate nalog? <Link to="/register">Registruj se.</Link></span>
      </form>
    </div>
  )
}

export default Login