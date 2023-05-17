import { useState } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'


import ProtectedRoute from './Components/ProtectedRoute'
//Components
import Nav from './Components/Nav/Nav'
import Catalogo from './Components/Catalogo/Catalogo'
import Login from './Components/LogIn/Login'
import CreateProduct from './Components/CreateProduct/CreateProduct'
import Dashboard from './Components/Dashboard/Dashboard'
import PageNotFound from './Components/PageNotFound/PageNotFound'
import ProductDetail from './Components/ProductDetail/ProductDetail'
import Footer from './Components/Footer/Footer'

function App() {
  

  return (
    <BrowserRouter>
      <Nav/>
      <Routes>        
        <Route index element={<Catalogo/>}/>
        <Route path='/' element={<Catalogo/>} />
        <Route path='/product/:id' element={<ProductDetail/>}/>
        <Route path='/login' element={<Login/>} />
        <Route element={<ProtectedRoute/>} >
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/createProduct' element={<CreateProduct/>}/>          
        </Route>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  )
}

export default App
