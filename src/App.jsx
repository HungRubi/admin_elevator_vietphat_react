import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import * as actions from './store/actions';
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
  ArticleAdd,
  ArticleEdit,
  OrderAdd,
  OrderEdit,
  ProductCategoryAdd,
  ProductCategoryEdit,
  DiscountCategoryAdd,
  DiscountCategoryEdit,
  BannerAdd, BannerEdit,
  Video,
  VideoAdd,
  VideoEdit,
  Supplier,
  SupplierAdd,
  SupplierEdit,
  Receipt,
  ReceiptAdd,
  ReceiptEdit,
  Warehouse,
  Notification,
  NotificationAdd
  } from './page/system'

function App() {
  const dispatch = useDispatch();
  const {message} = useSelector(state => state.app);
  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    dispatch(actions.resetMessage());
  }, [message, dispatch]);
  return (
    <>
      <Routes>
        <Route path='/' element={<Public/>}>
          <Route path='' element={<Dashboard/>}/>
          <Route path='order' element={<Order/>}/>
          <Route path='order/add' element={<OrderAdd/>}/>
          <Route path='order/:id/edit' element={<OrderEdit/>}/>
          <Route path='user' element={<User/>}/>
          <Route path='user/add' element={<UserAdd/>}/>
          <Route path='user/:id/edit' element={<UserEdit/>}/>
          <Route path='product' element={<Product/>}/>
          <Route path='product/add' element={<ProductAdd/>}/>
          <Route path='product/:id/edit' element={<ProductEdit/>}/>
          <Route path='article' element={<Article/>}/>
          <Route path='article/add' element={<ArticleAdd/>}/>
          <Route path='article/:id/edit' element={<ArticleEdit/>}/>
          <Route path='warehouse' element={<Warehouse/>}/>
          <Route path='category/notification' element={<Notification/>}/>
          <Route path='category/notification/add' element={<NotificationAdd/>}/>
          <Route path='report' element={<Report/>}/>
          <Route path='setting' element={<Setting/>}/>
          <Route path='category/product' element={<ProductCategory/>}/>
          <Route path='category/product/add' element={<ProductCategoryAdd/>}/>
          <Route path='category/product/:id/edit' element={<ProductCategoryEdit/>}/>
          <Route path='category/discount' element={<DiscountCategory/>}/>
          <Route path='category/discount/add' element={<DiscountCategoryAdd/>}/>
          <Route path='category/discount/:id/edit' element={<DiscountCategoryEdit/>}/>
          <Route path='category/banner' element={<Banner/>}/>
          <Route path='receipt' element={<Receipt/>}/>
          <Route path='receipt/add' element={<ReceiptAdd/>}/>
          <Route path='receipt/:id/edit' element={<ReceiptEdit/>}/>
          <Route path='category/supplier' element={<Supplier/>}/>
          <Route path='category/supplier/:id/edit' element={<SupplierEdit/>}/>
          <Route path='category/supplier/add' element={<SupplierAdd/>}/>
          <Route path='category/banner/add' element={<BannerAdd/>}/>
          <Route path='category/banner/:id/edit' element={<BannerEdit/>}/>
          <Route path='category/video' element={<Video/>}/>
          <Route path='category/video/add' element={<VideoAdd/>}/>
          <Route path='category/video/:id/edit' element={<VideoEdit/>}/>
          <Route path='*' element={<Dashboard/>}/>
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"/>
    </>
  )
}

export default App
