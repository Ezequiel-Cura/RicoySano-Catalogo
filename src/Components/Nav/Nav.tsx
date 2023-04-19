import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import style from "./Nav.module.scss"


export default function Nav() {
  const {pathname} = useLocation()
  
  return (
    <div className={style.nav_cointainer}>
      <h1>Rico y Sano Catalogo</h1>
      <div>
        <div>
          {
            pathname === "/login" ? (
              <Link to="/">Volver</Link>
            )
            :(
              <Link to="/login">Login</Link>
            )
          }
        </div>        
      </div>
    </div>
  )
}
