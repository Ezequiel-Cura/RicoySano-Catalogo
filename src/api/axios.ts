import axios from "axios"
import { AxiosRequestConfig } from "axios";
import { refreshToken } from "./UserActions";
const privAxios = axios.create({
    baseURL: import.meta.env.VITE_BACK_URL,
    headers:{'Content-Type': 'application/json'},
    withCredentials:true
})

privAxios.interceptors.request.use(
    (config)=>{
        
        config.headers = config.headers ?? {};
        
        if(!config?.headers['Authorization']){
            config.headers['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`
        }
        return config
    },(error)=>{
        console.log(error)
        Promise.reject(error)
    }
)
    
    
privAxios.interceptors.response.use(
    response=>response,
    async(error)=>{
        const prevRequest = error?.config;
        

        if(error?.response.status === 403 && !prevRequest?.sent){
            prevRequest.sent = true
            const newAccessToken = await refreshToken()
            prevRequest.headers['Authorization'] =`Bearer ${newAccessToken}`
            return axios(prevRequest)
        }
        return Promise.reject(error)
    }
)

export default privAxios;