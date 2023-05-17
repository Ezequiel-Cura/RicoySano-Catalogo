import {create} from "zustand"
import {devtools,persist} from "zustand/middleware"
import privAxios from "../api/axios"

interface InitialState{
    products: IProducts[]
    originalProdcuts:IProducts[]
    getProducts:()=>void
    deleteProducts:(id:string)=>void
    createProduct:(obj:IProducts)=>void
    orderByCategory:(category:string)=>void
    orderByAZ:(order:string)=>void
    searchProduct:(str:string)=>void
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
    originalProdcuts:[],
    getProducts:async()=>{
        // pedido a la api
        
        const {data} = await privAxios.get("/Products")
        set(state=>({
            originalProdcuts:data.products,
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
    },
    orderByCategory:async(category:string)=>{
        let productsArray = get().products
        
        if(category === "default"){
            set((state)=>({
                products: state.originalProdcuts
            }))
        }else{
            set((state)=>({
                products: state.originalProdcuts.filter((p)=>p.categories.includes(category)) 
            }))

        }
    },
    orderByAZ:async(order:string)=>{
        // let products = get().products
        console.log(order)
        if(order === "A-Z"){
            set(state=>({
                products: state.products.sort((a,b)=>{
                    if(a.name.toLowerCase() > b.name.toLowerCase())return 1;
                    if(a.name.toLowerCase() < b.name.toLowerCase())return -1;
                    return 0;
                  })
            }))
        }else if(order === "Z-A"){
            set(state=>({
                products: state.products.sort((a,b)=>{
                    if(a.name.toLowerCase() < b.name.toLowerCase())return 1;
                    if(a.name.toLowerCase() > b.name.toLowerCase())return -1;
                    return 0;
                  })
            }))
        }else{
            set(state=>({
                products:state.products
            }))
        }
    },
    searchProduct:async(str:string)=>{
        set((state)=>({
            products: state.originalProdcuts.filter(p=>p.name.toLowerCase().includes(str.toLowerCase()))
        }))
    }
    

}),{
    name:"products"
}))