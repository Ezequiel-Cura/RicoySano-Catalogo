import privAxios from "./axios";



export const getProductsQuery =async () => {
    const res = await privAxios.get("/products")
    console.log(res.data)
    return res.data
}

