import React from 'react'
import Logo from "../img/logo.jpg"

function Footer() {
  return (
    <footer>
      <img src={Logo} alt=""/>
      <span>
        Napravljeno uz pomoc <b>React.js</b> !
      </span>
    </footer>
  )
}

export default Footer