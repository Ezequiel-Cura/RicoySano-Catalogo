import { useQuery } from '@tanstack/react-query'
// import { getProductsQuery } from "../../api/productsActions"
import { IProduct } from '../../assets/Types/Types'
import {Image} from "cloudinary-react"
import styles from "./Products.module.scss"
import { useProductsStore } from '../../store/productsStore'
import privAxios from '../../api/axios'
import { useEffect } from 'react'

export default function Products() {
  const {products,getProducts} = useProductsStore((state)=>state)


  useEffect(()=>{
    if(!products.length){
      console.log("hola")
      getProducts()
    }
  },[])

  // const {isLoading,data,isError,error} = useQuery({
  //   queryKey:["products"],
  //   queryFn: async()=>{
  //     // const res = await privAxios.get("/products")
  //     if(!products.length){
  //       getProducts()
  //     }
    
  //   }
  // })

  // if(isLoading) return <div>Loading</div>
  // else if(isError) return <div>Error </div>

  return (
    <div className={styles.product_cointainer}>
     {
       products.length > 0 ? products.map((p:any,i:number)=>(
         <div key={i}>
           <Image cloudName={`${import.meta.env.VITE_CLOUD_NAME}`}
            publicId={p.product_image}>
           </Image>
            <span>{p.name} </span>
         </div>
       ))
        : <div>Productos no encontrados</div>
     }
      
    </div>
  )
}
