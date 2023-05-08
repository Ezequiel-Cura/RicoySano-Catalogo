import React from 'react'
import { Outlet,Navigate } from 'react-router'
import {useQuery} from "@tanstack/react-query"
import { useUserStore } from '../store/userStore'


export default function ProtectedRoute({Children}:any) {
    const {isAuth} = useUserStore((state)=>state)      

    
    if(isAuth === false)return <Navigate to="/login"/>

    return <Outlet/>
}
