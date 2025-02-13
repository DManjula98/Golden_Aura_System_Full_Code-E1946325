import {lazy} from 'react'
import { AdminDashboard} from "../../views/admin/AdminDashboard";
import Orders from "../../views/admin/Orders";
import Category from '../../views/admin/Category';
import Sellers from "../../views/admin/Sellers";
import PaymentRequest from "../../views/admin/PaymentRequest";
import SellersRequest from "../../views/admin/SellersRequest";
import DeactiveSellers from "../../views/admin/DeactiveSellers";
import SellerDetails from '../../views/admin/SellerDetails';
import ChatSeller from '../../views/admin/ChatSeller';
import OrderDetails from '../../views/admin/OrderDetails';
import AdminProfile from '../../views/admin/AdminProfile';
import EditCategory from '../../views/admin/EditCategory';

export const adminRoutes = [
    {
        path :'admin/dashboard', 
        element :<AdminDashboard/>,
        role :'admin'
    },
    {
        path :'admin/dashboard/orders', 
        element :<Orders/>,
        role :'admin'
    },
    {
        path :'admin/dashboard/category', 
        element :<Category/>,
        role :'admin'
    },
    {
        path :'admin/dashboard/sellers', 
        element :<Sellers/>,
        role :'admin'
    },
    {
        path :'admin/dashboard/payment-request', 
        element :<PaymentRequest/>,
        role :'admin'
    },
    {
        path :'admin/dashboard/deactive-sellers', 
        element :<DeactiveSellers/>,
        role :'admin'
    },
    {
        path :'admin/dashboard/sellers-request', 
        element :<SellersRequest/>,
        role :'admin'
    },
    {
        path :'admin/dashboard/seller/details/:sellerId', 
        element :<SellerDetails/>,
        role :'admin'
    },
    {
        path :'admin/dashboard/chat-sellers', 
        element :<ChatSeller/>,
        role :'admin'
    },
    {
        path :'admin/dashboard/chat-sellers/:sellerId', 
        element :<ChatSeller/>,
        role :'admin'
    },
    {
        path :'admin/dashboard/order/details/:orderId', 
        element :<OrderDetails/>,
        role :'admin'
    },
    {
        path :'admin/dashboard/admin-profile', 
        element :<AdminProfile/>,
        role :'admin'
    },
    {
        path :'admin/dashboard/edit-category/:categoryId', 
        element :<EditCategory/>,
        role :'admin'
    },
   
]