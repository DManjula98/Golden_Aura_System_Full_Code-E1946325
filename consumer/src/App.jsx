import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Cart from "./pages/Cart";
import Details from "./pages/Details";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Delivery from "./pages/Delivery";
import { useDispatch } from "react-redux";
import { get_category } from "./store/reducers/homeReducer";
import CategoryShop from "./pages/CategoryShop";
import Payment from "./pages/Payment";
import ProtectUser from "./utils/ProtectUser";
import CustomerDashboard from "./pages/CustomerDashboard";
import Index from "./components/dashboard/Index";
import Orders from "./components/dashboard/Orders";
import Wishlist from "./components/dashboard/Wishlist";
import Order from "./components/dashboard/Order";
import SearchProducts from "./pages/SearchProducts";
import Chat from "./components/dashboard/Chat";
import ConfirmOrder from "./pages/ConfirmOrder";
import Profile from "./components/dashboard/Profile";
import ContactForm from "./pages/ContactForm";
import Blog from "./pages/Blog";
import About from "./pages/About";
import BlogDetails from "./pages/BlogDetails";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import BrandShop from "./pages/BrandShop";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_category());
    // console.log(categories);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/details/:title" element={<BlogDetails />} />
        <Route path="/about" element={<About/>} />
        <Route path="/products" element={<CategoryShop />} />
        <Route path="/products" element={<BrandShop/>} />
        <Route path="/products/:brand" element={<BrandShop/>} />
        <Route path="/products/search?" element={<SearchProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order/confirm?" element={<ConfirmOrder />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/product/details/:slug" element={<Details />} />
        <Route path="/dashboard" element={<ProtectUser />}>
          <Route path="" element={<CustomerDashboard />}>
            <Route path="" element={<Index />} />
            <Route path="my-orders" element={<Orders />} />
            <Route path="order/details/:orderId" element={<Order />} />
            <Route path="my-wishlist" element={<Wishlist />} />
            <Route path="customer-profile" element={<Profile />} />
            <Route path="chat" element={<Chat/>} />
            <Route path="chat/:sellerId" element={<Chat/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
