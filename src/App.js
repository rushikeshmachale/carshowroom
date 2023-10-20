import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import Cart from "./components/customer/Cart";
import AdminHome from './components/admin/AdminHome'
import Home from "./components/customer/Home";
import View from "./components/customer/View";
import ViewCar from './components/admin/ViewCar'
import AddCar from "./components/admin/AddCar";
import UpdateCar from "./components/admin/UpdateCar";
import UserContextProvider from "./context/UserContextProvider";
import Order from "./components/customer/Order";
import AdminOrders from "./components/admin/AdminOrders";
import Error from "./components/Auth/Error";
import AdminOrderUpdate from "./components/admin/AdminOrderUpdate";
function App() {
  return(
    
    <UserContextProvider>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Signin/>}/>
    <Route path="/register" element={<Signup/>}/>
    <Route path="/home/:id" element={<Home/>}/>
    <Route path="/view/:id" element={<View/>}/>
    <Route path="/cart/:id" element={<Cart/>}/>
    <Route path="/orders/:id" element={<Order/>}/>
    
    
    <Route path="/adminhome/:email" element={<AdminHome/>}/>
    <Route path="/admin/add" element={<AddCar/>}/>
    <Route path="/adminview/:modelNo" element={<ViewCar/>}/>
    <Route path="/admin/orders" element={<AdminOrders/>}/>
    <Route path="/adminupdate/:modelNo" element={<UpdateCar/>}/>
    <Route path="/admin/order/:orderId" element={<AdminOrderUpdate/>}/>
    <Route path="*" element={<Error/>}/>
    
    {/**
  */}

    </Routes>
    </BrowserRouter>
  
    </UserContextProvider>
    )
}

export default App;
