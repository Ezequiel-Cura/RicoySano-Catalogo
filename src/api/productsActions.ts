import privAxios from "./axios";



export const getProductsQuery =async () => {
    console.log("Hola")
    const res = await privAxios.get("/Products")
    console.log(res.data)
    return res.data
}

