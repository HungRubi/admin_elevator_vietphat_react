import './App.css';
import { Route, Routes } from 'react-router-dom';

import {
  Article, 
  Dashboard, 
  Order, 
  Product, ProductAdd,ProductEdit,
  Public, 
  User, UserAdd, UserEdit,
  Report, 
  Setting, 
  ProductCategory,DiscountCategory,Banner,
  } from './page/system'

function App() {
  return (
    <>
      <Routes>
        <Route>
          <Route path='/' element={<Public/>}>
            <Route path='' element={<Dashboard/>}/>
            <Route path='order' element={<Order/>}/>
            <Route path='user' element={<User/>}/>
            <Route path='user/add' element={<UserAdd/>}/>
            <Route path='user/:id/edit' element={<UserEdit/>}/>
            <Route path='product' element={<Product/>}/>
            <Route path='product/add' element={<ProductAdd/>}/>
            <Route path='product/:id/edit' element={<ProductEdit/>}/>
            <Route path='article' element={<Article/>}/>
            <Route path='report' element={<Report/>}/>
            <Route path='setting' element={<Setting/>}/>
            <Route path='category/product' element={<ProductCategory/>}/>
            <Route path='category/discount' element={<DiscountCategory/>}/>
            <Route path='category/banner' element={<Banner/>}/>
            <Route path='*' element={<Dashboard/>}/>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
