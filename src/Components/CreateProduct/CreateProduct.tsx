import React, { useState,useRef } from 'react'
import styles from "./CreateProduct.module.scss"
import { useProductsStore } from '../../store/productsStore'

export default function CreateProduct() {
  const {createProduct} = useProductsStore(state=>state)
  const [imagePrev,setImagePrev]:any = useState()
  const [categories,setCategories] = useState<Array<string>>()
  const [variants,setVariants] = useState<Array<string>>()
  const inputCategories:any = useRef("")
  const inputVariants:any = useRef("")

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const product:any = Object.fromEntries(formData) 
    product.categories = categories
    product.variants = variants
    product.categories_string = JSON.stringify(categories)
    console.log(product)
    createProduct(product)
  }


  const previewSource = (file:any)=>{
    const imagefile = file[0]
    const reader = new FileReader()
    reader.readAsDataURL(imagefile);
    reader.onloadend = () => {
      setImagePrev(reader.result as string);
    };
    
  } 

  const handleAddCategories = ()=>{
    setCategories([...categories || [],inputCategories.current.value])
    inputCategories.current.value = ""
    console.log()
  }

  const handleAddVariants = ()=>{
    setVariants([...variants || [],inputVariants.current.value])
    inputVariants.current.value = ""
  }


  return (
    <div className={styles.createProduct_cointainer}>
      <h4>Create your Product</h4>
      <div className={styles.div_form_wrapper}>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className={styles.firstForm_section}>
            <div>
              <label htmlFor="">Nombre</label>
              <input type="text" name='name'/>
            </div>

            <div>
              <label htmlFor="">Presentacion</label>
              <input type="text" name='presentation'/>
            </div>

            <div>
              <label htmlFor="">Precio</label>
              <input type="number" />
            </div>
          </div>

          <div className={styles.secondForm_section}>
            <div>
              <label htmlFor="">Categorias</label>
              <input type="text" name='categories' ref={inputCategories}/>
              <button onClick={handleAddCategories}>add</button>
              <div>
                {
                  categories?.length ? categories.map((cate:string,i:number)=>(
                    <div key={i}>{cate} </div>
                  ))
                  :null
                }
              </div>
            </div>

            <div>
              <label htmlFor="">Variantes</label>
              <input type="text" name='variants' ref={inputVariants}/>
              <button onClick={handleAddVariants}>add</button>
              <div>
              {
                  variants?.length ? variants.map((vari:string,i:number)=>(
                    <div key={i}>{vari} </div>
                  ))
                  :null
                }
              </div>
            </div>
          </div>
          

          <div className={styles.img_wrapper}>
            <label>Image: </label>
            <input 
              type="file" 
              name="product_image" 
              onChange={(e)=>previewSource(e.target.files)}
            />
            <div>
             {imagePrev ? <img src={imagePrev} alt="img" className={styles.preview_img} /> : null}
            </div>
          </div>

          <button type='submit'>Add Product</button>

        </form>
      </div>
    </div>
  )
}
