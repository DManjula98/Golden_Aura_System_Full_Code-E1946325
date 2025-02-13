import authReducer from './reducers/authReducer';
import categoryReducer from './reducers/categoryReducer';
import productReducer from './reducers/productReducer';
import sellerReducer from './reducers/sellerReducer';
import productCategoryReducer from './reducers/productCategoryReducer';
import orderReducer from './reducers/orderReducer';
import chatReducer from './reducers/chatReducer';
import paymentReducer from './reducers/paymentReducer';
import dashboardIndexReducer from './reducers/dashboardIndexReducer';
import bannerReducer from './reducers/bannerReducer';
import blogReducer from './reducers/blogReducer';

const rootReducers = {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    seller: sellerReducer,
    productCategory: productCategoryReducer,
    order: orderReducer,
    chat: chatReducer,
    payment : paymentReducer,
    dashboardIndex : dashboardIndexReducer,
    banner : bannerReducer,
    blog: blogReducer,
  
};


export default rootReducers;
