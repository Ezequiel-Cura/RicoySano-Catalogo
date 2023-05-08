import {create} from "zustand"
import {devtools,persist} from "zustand/middleware"
import privAxios from "../api/axios"
interface Iuser{
    user:{
        name:string,
        email:string,
        isAdmin:boolean,
        img:string,
        token:string,
    },
    isAuth:boolean
    getUser:()=>void,
    login:(values:Ilogin)=>void
    logout:()=>void
}

interface Ilogin{
    email:string
    password:string
}

const initialState = {
    user:{
        name:"",
        email:"",
        isAdmin:false,
        img:"",
        token:"",
    }
}

export const useUserStore = create(persist<Iuser>((set,get)=>({
    user:{
        name:"",
        email:"",
        isAdmin:false,
        img:"",
        token:"",
    },
    isAuth:false,
    login:async(values:Ilogin)=>{
        const {data} = await privAxios.post("/auth/login",values,{
            withCredentials:true
        })
        localStorage.setItem("accessToken",data.accessToken)
        set(state=>({
            user:data.user,
            isAuth:true
        }))
    },
    logout:async()=>{
        const {data} = await privAxios.get("/auth/logout",{
            withCredentials:true
        })

        localStorage.removeItem("accessToken")
        set(state=>({
            user:data.user,
            isAuth:false
        }))
    },
    getUser:async()=>{
        const {data} = await privAxios.get("/user")

        set(state=>({
            user: data.user
        }))
    },

}),{
    name:"user"
}))