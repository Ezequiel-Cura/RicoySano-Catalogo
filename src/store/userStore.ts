import {create} from "zustand"

interface Iuser{
    user:{
        name:string,
        email:string,
        password:string,
        isAdmin:boolean,
        img:string,
        token:string
    }
}


export const useUserStore = create<Iuser>((set,get)=>({
    user:{
        name:"",
        email:"",
        password:"",
        isAdmin:false,
        img:"",
        token:""
    },
}))