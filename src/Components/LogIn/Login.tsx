import React, { useState } from 'react'
import styles from "./Login.module.scss"
import OrganicProducts from "../../assets/images/orgincProducts.jpg"
import { loginUser } from '../../api/UserActions'
import {useMutation,useQuery} from "@tanstack/react-query"
import { Iuser } from '../../api/UserActions'
import {Formik, Form,Field,ErrorMessage} from "formik"
import * as yup from "yup"
import { useUserStore } from '../../store/userStore'
import { Navigate } from 'react-router-dom'

export default function Login() {
  const {login,isAuth} = useUserStore(state=>state)
  const loginSchema = yup.object().shape({
    email: yup.string().email("Ese email no existe").required("Tu email es requerido"),
    password: yup.string().min(5,"Too short").required("Password required")
  })

  

  const handleSubmit = async (values:Iuser,submitProps:any)=>{
    console.log(values)
    // const formData = new FormData(e.currentTarget)
    // const user:any = Object.fromEntries(formData) 
    login(values)     
    console.log("llegue")
    return (<Navigate to="/dashboard" replace={true} />)
  }
  if(isAuth)return (<Navigate to="/dashboard" replace={true} />)

  return (
    <div className={styles.login_cointainer}>
      <img src={OrganicProducts} alt="OrganicProducts" />
      <div>
        <Formik
          initialValues={{email:"",password:""}}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({isSubmitting,isValid})=>(
            <Form >
                <h5>Login</h5>
              
                <label htmlFor="">Email</label>
                <Field type="text" name="email" placeholder="Email"  />
                <ErrorMessage name='email' className={styles.errorMsg} component="span"/>
              
                <label htmlFor="">Contraseña</label>
                <Field type="password" name="password" placeholder="password" />
                <ErrorMessage name='password' className={styles.errorMsg} component="span"/>
              
              <button type='submit' disabled={!isValid || isSubmitting}>Submit</button>
            </Form>
          )}
        </Formik>
        
      </div>
    </div>
  )
}
