import { useQuery } from '@tanstack/react-query'
import { getProductsQuery } from "../../api/productsActions"
import { IProduct } from '../../assets/Types/Types'
import {Image} from "cloudinary-react"
import styles from "./Catalogo.module.scss"
import { useProductsStore } from '../../store/productsStore'


export default function Products() {
  const products = useProductsStore((state)=>state.products)


  const {isLoading,data,isError,error} = useQuery({
    queryKey:["products"],
    queryFn: getProductsQuery
  })
  if(isLoading) return <div>Loading</div>
  else if(isError) return <div>Error </div>

  return (
    <div className={styles.product_cointainer}>
     {
       data.products.length > 1 ? data.products.map((p:IProduct,i:number)=>(
         <div key={i}>
           <Image cloudName={`${import.meta.env.VITE_CLOUD_NAME}`}
            publicId={p.product_image}>
           </Image>
            <span>{p.name} </span>
         </div>
       ))
        : <div>Products no found</div>
     }
      
    </div>
  )
}
