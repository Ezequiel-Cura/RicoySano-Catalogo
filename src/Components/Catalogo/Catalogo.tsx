import { useEffect, useState } from "react"
import styles from "./Catalago.module.scss"
import Products from "../Products/Products"
import { useProductsStore } from "../../store/productsStore"

export default function Catalogo() {
  const {products,getProducts,orderByAZ,orderByCategory,searchProduct} = useProductsStore((state)=>state)
  let [categories,setCategories] = useState(Array<string>)

  useEffect(()=>{
    getProducts()
    getCategories()
  },[])

  const getCategories = ():Array<string>=>{
    if(products.length){
      products?.map((p)=> categories = [...categories,...p.categories])
      categories = [...new Set(categories)]
      setCategories(categories)
      return categories
    }else{
      return []
    }
  }

  const handleChangeAZ = (e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()
    orderByAZ(e.target.value)
    // if(e.target?.value === "A-Z"){
    //   // dispatch(orderAZ(e.target?.value))
    // }else if(e.target?.value === "Z-A"){
    //   // dispatch(orderZA())
    // }else{
    //   return
    // }
  }

  const handleCategory = (e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()
    orderByCategory(e.target.value)
    // dispatch(orderByCategory({category: e.target?.value}))
    // dispatch(getProductsByCategory(e.target.value))
  }

  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()
    searchProduct(e.target.value)
    // dispatch(searchProduct(e.target.value))
  }

  return (
    <div className={styles.catalogo_Cointainer} >      
      <div className={styles.filter_cointainer}>
        <h5>Filtros</h5>
        <div className={styles.filter_wrapper}>

          <div className={styles.filter_items}>
            <span>Categorias: </span>
            <select name="Category"  onChange={(e:any)=>{
              handleCategory(e)
              // HACER QUE CUANDO CAMBIA LA CATEGORIA EL ORDEN Z-A SE RESETIE
              }}>
              <option value="default">Todas</option>
              {
                categories?.length > 0 ?  categories?.map(c=>(
                  <option value={c} key={c}>{c}</option>
                ))
                :null
              }              
            </select>
          </div>
        
          <div className={styles.filter_items}>
            <span>Orden: </span>
            <select name="Alphabety" id=""  onChange={(e:any)=>handleChangeAZ(e)}>
              <option value="default">Orden</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
          </div>       
          <div className={styles.filter_items}>
            <span>Búsqueda:</span>
            <input type="text" onChange={(e)=>{
                handleSearch(e)                  
              }}/>
          </div>        
        </div>
          
                      
      </div>

      <div>
        <Products/>
      </div>

      <div >

      </div>
    </div>
  )
}
