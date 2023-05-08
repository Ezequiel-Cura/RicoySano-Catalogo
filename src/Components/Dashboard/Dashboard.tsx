import React, { useEffect } from 'react'
import { useProductsStore } from '../../store/productsStore'
import styles from "./dashboard.module.scss"
import { Link } from 'react-router-dom'
import {Image} from "cloudinary-react"

export default function Dashboard() {
  const {products,getProducts,deleteProducts}= useProductsStore(state=>state)

  const handleDelete = (id:string)=>{
    deleteProducts(id)
  }

  useEffect(()=>{
    if(!products.length){
      getProducts()
    }
  },[])

  return (
    <div className={styles.dashboard_cointainer}>
      <h1>Dashboard</h1>
      <button onClick={()=>getProducts()}>Refresh Products</button>
      <Link to="/createProduct">
        <span>Crear tus Productos</span>  
      </Link>
      <table>
        <tbody>
          {
            products.length ? products.map((p,i)=>(
              <tr key={i}  className={styles.tr}>
                <th><Image cloudName={`${import.meta.env.VITE_CLOUD_NAME}`}
                  publicId={p.product_image} >
                </Image> </th>
                <th><Link to={"/product/" + p.product_id}>{p.name}</Link></th>
                <th>Update</th>
                <th><button onClick={()=>handleDelete(p.product_id)}>Eliminate</button></th>
              </tr>
            ))
            : <span>No Products</span>
          }
        </tbody>
      </table>
    </div>
  )
}
