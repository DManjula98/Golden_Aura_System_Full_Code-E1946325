import {AiFillDashboard, AiOutlineShoppingCart, AiOutlinePlus } from "react-icons/ai";
import { BiCategory } from 'react-icons/bi';
import { MdOutlinePayment } from "react-icons/md";
import { BiLoaderCircle } from 'react-icons/bi';
import { BsChat } from "react-icons/bs";
import { CiChat1 } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { RiProductHuntLine } from "react-icons/ri";

export const allNav = [
    {
        id : 1,
        title : 'Dashboard',
        icon : <AiFillDashboard/>,
        role : 'admin',
        path : '/admin/dashboard'
    },
    {
        id : 2,
        title : 'Orders',
        icon : <AiOutlineShoppingCart/>,
        role : 'admin',
        path : '/admin/dashboard/orders'
    },
    {
        id : 3,
        title : 'Category',
        icon : <BiCategory/>,
        role : 'admin',
        path : '/admin/dashboard/category'
    }, 
    {
        id : 5,
        title : 'Sellers',
        icon : <FiUsers/>,
        role : 'admin',
        path : '/admin/dashboard/sellers'
    },
    {
        id :6,
        title : 'Payment Request',
        icon : <MdOutlinePayment />,
        role : 'admin',
        path : '/admin/dashboard/payment-request'
    },
    {
        id : 7,
        title : 'Deactive Sellers',
        icon : <FiUsers/>,
        role : 'admin',
        path : '/admin/dashboard/deactive-sellers'
    },
    {
        id : 8,
        title : 'Sellers Request',
        icon : <BiLoaderCircle/>,
        role : 'admin',
        path : '/admin/dashboard/sellers-request'
    },
    {
        id : 9,
        title : 'Chat Sellers',
        icon : <CiChat1 />,
        role : 'admin',
        path : '/admin/dashboard/chat-sellers'
    },
    {
        id : 10,
        title : 'Profile',
        icon : <FiUsers/>,
        role : 'admin',
        path : '/admin/dashboard/admin-profile'
    },
    {
        id : 11,
        title : 'Dashboard',
        icon : <AiFillDashboard/>,
        role : 'seller',
        path : '/seller/dashboard'
    },
    {
        id : 12,
        title : 'Add Product',
        icon : <AiOutlinePlus/>,
        role : 'seller',
        path : '/seller/dashboard/add-product'
    },
    {
        id : 13,
        title : 'All Product',
        icon : <RiProductHuntLine/>,
        role : 'seller',
        path : '/seller/dashboard/products'
    },
    {
        id : 14,
        title : 'Add Blog',
        icon : <AiOutlinePlus/>,
        role : 'seller',
        path : '/seller/dashboard/add-blog'
    },
    {
        id : 15,
        title : 'All Blog',
        icon : <RiProductHuntLine/>,
        role : 'seller',
        path : '/seller/dashboard/blogs'
    },
    {
        id : 16,
        title : 'Orders',
        icon : <AiOutlineShoppingCart/>,
        role : 'seller',
        path : '/seller/dashboard/orders'
    },
    {
        id : 17,
        title : 'Payments',
        icon : <MdOutlinePayment/>,
        role : 'seller',
        path : '/seller/dashboard/payments'
    },
    {
        id : 18,
        title : 'Chat Customer',
        icon : <BsChat/>,
        role : 'seller',
        path : '/seller/dashboard/chat-customer'
    },
    {
        id : 19,
        title : 'Chat Support',
        icon : <CiChat1 />,
        role : 'seller',
        path : '/seller/dashboard/chat-support'
    },
    {
        id : 20,
        title : 'Profile',
        icon : <FiUsers/>,
        role : 'seller',
        path : '/seller/dashboard/profile'
    },

]