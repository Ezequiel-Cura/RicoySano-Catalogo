import React, { useState } from 'react'

export default function CreateProduct() {
  const [imagePrev,setImagePrev]:any = useState()


  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    
  }


  const previewSource = (file:any)=>{
    const imagefile = file[0]
    const reader = new FileReader()
    reader.readAsDataURL(imagefile);
    reader.onloadend = () => {
      setImagePrev(reader.result as string);
    };
    
  } 
  return (
    <div>
      <h4>Create your Product</h4>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Nombre</label>
          <input type="text" name='name'/>

          <label htmlFor="">Presentacion</label>
          <input type="text" name='presentation'/>

          <label htmlFor="">Categorias</label>
          <input type="text" name='categories'/>

          <label htmlFor=""></label>
          <input type="text" />

          <label>Image: </label>
          <input 
            type="file" 
            name="product_image" 
            onChange={(e)=>previewSource(e.target.files)}
          />

          <button type='submit'>Add Product</button>

        </form>
      </div>
    </div>
  )
}
