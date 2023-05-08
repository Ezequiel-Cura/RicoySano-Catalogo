import {create} from "zustand"
import {devtools,persist} from "zustand/middleware"
import privAxios from "../api/axios"

interface InitialState{
    products: IProducts[]
    getProducts:()=>void
    deleteProducts:(id:string)=>void
    createProduct:(obj:IProducts)=>void
}

interface IProducts{    
    name:string,
    product_id:string,
    product_image:string,
    categories:string[],
    variants:string[],
    presentation:string    
}

export const useProductsStore = create(persist<InitialState>((set,get)=>({
    products:[],
    getProducts:async()=>{
        // pedido a la api
        console.log("Hola")
        const {data} = await privAxios.get("/Products")
        set(state=>({
            
            products: data.products
        }))
    },
    deleteProducts:async(id:string)=>{
        const {data} = await privAxios.delete("/Product/"+id)
    },
    createProduct:async(obj:IProducts)=>{
        const {data} = await privAxios.post("/Product",obj,{     
                 headers: { 'content-type': 'multipart/form-data' },
                 withCredentials:true
            }
        )
    }
}),{
    name:"products"
}))