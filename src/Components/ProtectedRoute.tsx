import React from 'react'
import { Outlet,Navigate } from 'react-router'
import {useQuery} from "@tanstack/react-query"

export default function ProtectedRoute({Children}:any) {
    
    const {data,error,isLoading,isError} = useQuery({
        queryKey:["products"]
    })
    console.log("Protected",data)

    if(isLoading)return <div style={{position:"absolute",width:"100%",height:"100vh", backgroundColor:"grey"}}>Loading</div>
    if(isError)return <Navigate to="/login"/>

    return <Children/>
}
