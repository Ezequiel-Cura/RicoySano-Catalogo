import {create} from "zustand"
import {devtools} from "zustand/middleware"
import privAxios from "../api/axios"

interface InitialState{
    products: IProducts[]
    getProducts:(data:IProducts[])=>void
}

interface IProducts{    
    name:string,
    product_id:string,
    product_image:string,
    categories:string[],
    variants:string[],
    presentation:string    
}

export const useProductsStore = create<InitialState>((set,get)=>({
    products:[],
    getProducts:async(data:IProducts[])=>{
        //pedido a la api
        // const {data} = await privAxios.get("/products")
        set(state=>({
            ...state,
            products: data
        }))
    }
}))