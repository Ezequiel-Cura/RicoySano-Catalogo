import privAxios from "./axios";

export interface Iuser{
    email:string,
    password:string
}

export const loginUser = async(user:Iuser)=>{
    const data = await privAxios.post("/auth/login",user,{
        withCredentials:true
    })
}


export const refreshToken = async()=>{
    const {data} = await privAxios.get("/refresh",{
        withCredentials:true
    })

    return data.accessToken
}