import style from "./Catalago.module.scss"
import Products from "../Products/Products"

export default function Catalogo() {
 

  return (
    <div className={style.catalogo_Cointainer} >
      <h4 className={style.title}>Catalogo</h4>
      <div>
        <Products/>
      </div>
      <div >

      </div>
    </div>
  )
}
