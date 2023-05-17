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
      
        <div className={style.nav_links}>
          { 
            pathname === "/login" || pathname === "/dashboard" ? (
              <Link to="/" className={style.button2}>Volver</Link>
            )
            : isAuth ? null : (

              <Link to="/login" className={style.button2}>Login</Link>
            )
          }
          {
            isAuth ? (
              <Link to="/dashboard" className={style.button2}><span>Dashboard</span> </Link>
            ):null
          }
          {
            isAuth ? (
              <button onClick={handleLogout} className={style.button2} id={style.btnID}>Logout</button>
            ):null
          }
        </div>        
      
    </div>
  )
}
