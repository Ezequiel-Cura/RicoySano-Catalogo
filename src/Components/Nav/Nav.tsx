import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import style from "./Nav.module.scss"
import { useUserStore } from '../../store/userStore'

export default function Nav() {
  const {pathname} = useLocation()
  const {isAuth,logout} = useUserStore(state=>state)  
  const handleLogout = ()=>{
    logout()
  }
  return (
    <div className={style.nav_cointainer}>
      <h1>Rico y Sano Catalogo</h1>
      <div>
        <div>
          {
            pathname === "/login" || pathname === "/dashboard" ? (
              <Link to="/">Volver</Link>
            )
            :(
              <Link to="/login">Login</Link>
            )
          }
          {
            isAuth ? (
              <Link to="/dashboard">Dashboard</Link>
            ):null
          }
          {
            isAuth ? (
              <button onClick={handleLogout}>Logout</button>
            ):null
          }
        </div>        
      </div>
    </div>
  )
}
