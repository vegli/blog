import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../img/logo.jpg"

function Navbar() {
  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <img src={Logo} alt='' /> 
        </div>
        <div className="links">
          <Link className='link' to="/?cat=art"><h6>UMETNOST</h6></Link>
          <Link className='link' to="/?cat=science"><h6>NAUKA</h6></Link>
          <Link className='link' to="/?cat=technology"><h6>TEHNOLOGIJA</h6></Link>
          <Link className='link' to="/?cat=cinema"><h6>BIOSKOP</h6></Link>
          <Link className='link' to="/?cat=design"><h6>DIZAJN</h6></Link>
          <Link className='link' to="/?cat=food"><h6>HRANA</h6></Link>
          <span>John</span>
          <span>Logout</span>
          <span className='write'><Link to="/write" className='link'>Write</Link></span>

        </div>
      </div>
    </div>
  )
}

export default Navbar