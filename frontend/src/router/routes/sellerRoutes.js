import { lazy } from "react";
import {SellerDashboard} from "../../views/seller/SellerDashboard";
import AddProduct from "../../views/seller/AddProduct";
import Products from "../../views/seller/Products";
import DiscountProduct from "../../views/seller/DiscountProduct";
import Orders from "../../views/seller/Orders";
import Payments from "../../views/seller/Payments";
import SellerToAdminChat from "../../views/seller/SellerToAdminChat";
import SellerToCustomerChat from "../../views/seller/SellerToCustomerChat";
import Profile from "../../views/seller/Profile";
import EditProduct from "../../views/seller/EditProduct";
import OrderDetails from "../../views/seller/OrderDetails";
import Pending from "../../views/Pending";
import Deactive from "../../views/Deactive";
import Banner from "../../views/seller/Banner";
import AddBanner from "../../views/seller/AddBanner";
import AddBlog from "../../views/seller/AddBlog";
import Blogs from "../../views/seller/Blogs";
import EditBlogs from "../../views/seller/EditBlogs";

export const sellerRoutes = [
  {
    path: '/seller/account-pending',
    element: <Pending />,
    ability: 'seller'
},
{
    path: '/seller/account-deactive',
    element: <Deactive/>,
    ability: 'seller'
},
  {
    path: "seller/dashboard",
    element: <SellerDashboard />,
    role: "seller",
    status: "active",
  },
  {
    path: "seller/dashboard/add-product",
    element: <AddProduct />,
    role: "seller",
    status: "active",
  },
  {
    path: "seller/dashboard/edit-product/:productId",
    element: <EditProduct />,
    role: "seller",
    status: "active",
  },
  {
    path: "seller/dashboard/products",
    element: <Products />,
    role: "seller",
    status: "active",
  },
  {
    path: "seller/dashboard/discount-product",
    element: <DiscountProduct />,
    role: "seller",
    status: "active",
  },

  {
    path: '/seller/dashboard/add-banner/:productId',
    element: <AddBanner/>,
    role: 'seller',
    status: 'active'
  },
  {
    path: '/seller/dashboard/banners',
    element: <Banner/>,
    role: 'seller',
    status: 'active'
  },
  {
    path: "seller/dashboard/Orders",
    element: <Orders />,
    role: "seller",
    visibility: ["active", "deactive"],
  },
  {
    path: "/seller/dashboard/order/details/:orderId",
    element: <OrderDetails />,
    role: "seller",
    visibility: ["active", "deactive"],
  },
  {
    path: "seller/dashboard/Payments",
    element: <Payments />,
    role: "seller",
    status: "active",
  },
  {
    path: "seller/dashboard/chat-customer/:customerId",
    element: <SellerToCustomerChat />,
    role: "seller",
    status: "active",
  },
  {
    path: "seller/dashboard/chat-customer",
    element: <SellerToCustomerChat />,
    role: "seller",
    status: "active",
  },
  {
    path: "seller/dashboard/chat-support",
    element: <SellerToAdminChat />,
    role: "seller",
    visibility: ["active", "deactive", "pending"],
  },
  {
    path: "seller/dashboard/profile",
    element: <Profile />,
    role: 'seller',
    visibility: ["active", "deactive", "pending"],
  },
  {
    path: "seller/dashboard/add-blog",
    element: <AddBlog />,
    role: "seller",
    status: "active",
  },
  {
    path: "seller/dashboard/blogs",
    element: <Blogs />,
    role: "seller",
    status: "active",
  },
  {
    path: "seller/dashboard/edit-blog/:blogId",
    element: <EditBlogs />,
    role: "seller",
    status: "active",
  },
];