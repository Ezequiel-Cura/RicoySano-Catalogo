import React, { useEffect } from 'react'
import {useParams} from "react-router-dom"
import {Image} from "cloudinary-react"
import { useProductsStore } from "../../store/productsStore"
import styles from "./ProductDetail.module.scss"


export default function ProductDetail() {
    let {id} = useParams()
    const {singleProduct,getSingleProduct} = useProductsStore(state=>state)  

    useEffect(()=>{
        getSingleProduct(id)
    },[])
  return (
    <div>
         <h1>{singleProduct?.name}</h1>
        <div className={styles.detail_properties}>
          <div className={styles.image_wrapper}>
            <Image
              cloudName={`${import.meta.env.VITE_CLOUD_NAME}`}
              publicId={singleProduct.product_image}>
            </Image>
          </div>
          <div className={styles.properties}>
            <div>
              <span>Presentacion: </span>
              <span>{singleProduct.presentation}</span>
            </div>        
                      
            <div>
              <span>Categorias: </span>
              <span>{singleProduct.categories.join(" - ")}</span>
            </div>           

            <div>
              <span>Variantes: </span>
              <span>{singleProduct.variants.join(" - ")}</span>
            </div>
            
            <span></span>
            <span></span>
          </div>
        </div>
    </div>
  )
}
