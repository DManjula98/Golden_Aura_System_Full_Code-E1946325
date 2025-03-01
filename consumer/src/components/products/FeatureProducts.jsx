import React, { useEffect } from "react";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Rating from "../Rating";
import { useSelector, useDispatch } from 'react-redux'
import { add_to_cart , messageClear, add_to_wishlist} from  "../../store/reducers/cartReducer";
import toast from 'react-hot-toast'
import { formatPrice } from '../../utils/formatUtils';

const FeatureProducts = ({products}) => {
  const navigate = useNavigate()
  const dispatch =useDispatch()
  const { userInformation} = useSelector(state => state.auth)
  const { successMessage, errorMessage} = useSelector(state => state.cart)
 
  const add_cart =(id) =>{
    if(userInformation){
      dispatch(add_to_cart({
        userId: userInformation.id,
        quantity: 1,
        productId: id
      }))
    }else{
      navigate('/login')
      window.scrollTo(0, 0); 
    }
  }

  useEffect(() => {
    if (successMessage) {
        toast.success(successMessage)
        dispatch(messageClear())
    }
    if (errorMessage) {
        toast.error(errorMessage)
        dispatch(messageClear())
    }
}, [errorMessage, successMessage])


const add_wishlist = (product) => {
  if(userInformation){dispatch(add_to_wishlist({
    userId: userInformation.id,
    productId: product._id,
    name: product.name,
    price: product.price,
    images: product.images && product.images.length > 0 ? product.images : ['default_image_url'],
    discount: product.discount,
    rating: product.rating,
    slug: product.slug
  }))
  } else{
    navigate('/login')
    window.scrollTo(0, 0); 
  }
}

  return (
    <div className="w-[85%] flex flex-wrap mx-auto">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
          <h2>Feature Products</h2>
          <div className="w-[100px] h-[4px] bg-[#7fad39] mt-4"></div>
        </div>
      </div>
      <div className="w-full grid grid-cols-5 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {products.map((product, i) => (
          <div key={i} className="border group transition-all duration-500 hover:shadow-md hover:-mt-3"   style={{
            borderRadius: '12px',
            overflow: 'hidden', 
            transition: 'all 0.3s ease-in-out', 
          }}>
            <div className="relative overflow-hidden">
            {
                product.discount ? <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>{product.discount}%</div> : ""
            }
              <img
                className="sm:w-full w-full h-[240px] bg-slate-600"
                src={product.images[0]}
                alt="product image"
              />
              <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
                <li onClick={()=> add_wishlist(product)} className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all">
                  <AiFillHeart />
                </li>
                <Link
                  to={`/product/details/${product.slug}`}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all"
                >
                  <FaEye />
                </Link>
                <li onClick={()=>add_cart(product._id)} className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all">
                  <AiOutlineShoppingCart />
                </li>
              </ul>
            </div>
            <div className="py-3 text-slate-600 px-2">
              <h2>{product.name}</h2>
              <h3><strong>{product.brand}</strong></h3>
              <div className="flex justify-start items-center gap-3">
                <span className="text-lg  font-bold">{formatPrice(product.price)}</span>
                <div className="flex">
                  <Rating ratings={product.rating} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureProducts;
