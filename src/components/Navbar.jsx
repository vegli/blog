import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import Logo from "../img/logo.jpg"

const Navbar = () => {

  const {currentUser, logout} = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt='' />       
          </Link>
        </div>
        <div className="links">
          <Link className='link' to="/?cat=art"><h6>UMETNOST</h6></Link>
          <Link className='link' to="/?cat=science"><h6>NAUKA</h6></Link>
          <Link className='link' to="/?cat=technology"><h6>TEHNOLOGIJA</h6></Link>
          <Link className='link' to="/?cat=cinema"><h6>BIOSKOP</h6></Link>
          <Link className='link' to="/?cat=design"><h6>DIZAJN</h6></Link>
          <Link className='link' to="/?cat=food"><h6>HRANA</h6></Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (<span onClick={logout}>Odjava</span>) : (<Link className='link' to="/login">Prijava</Link>)}
          <span className='write'><Link to="/write" className='link'>Piši</Link></span>

        </div>
      </div>
    </div>
  )
}

export default Navbar