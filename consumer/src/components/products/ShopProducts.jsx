import React, { useEffect } from "react";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import Rating from "../Rating";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  add_to_cart,
  messageClear,
  add_to_wishlist,
} from "../../store/reducers/cartReducer";
import { formatPrice } from "../../utils/formatUtils";

const ShopProducts = ({ products, styles }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInformation } = useSelector((state) => state.auth);

  const add_cart = (id) => {
    if (userInformation) {
      dispatch(
        add_to_cart({
          userId: userInformation.id,
          quantity: 1,
          productId: id,
        })
      );
    } else {
      navigate("/login");
    }
  };

  const add_wishlist = (product) => {
    if (userInformation) {
      dispatch(
        add_to_wishlist({
          userId: userInformation.id,
          productId: product._id,
          name: product.name,
          price: product.price,
          images:
            product.images && product.images.length > 0
              ? product.images
              : ["default_image_url"],
          discount: product.discount,
          rating: product.rating,
          slug: product.slug,
        })
      );
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      className={`w-full grid ${
        styles === "grid"
          ? "grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6"
          : "grid-cols-1 gap-6"
      }`}
    >
      {products.map((product, i) => (
        <div
          key={i}
          className={`flex bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 hover:shadow-lg ${
            styles === "grid"
              ? "flex-col items-start"
              : "flex flex-col sm:flex-row items-center gap-4"
          }`}
        >
          <div
            className={`relative group overflow-hidden ${
              styles === "grid"
                ? "w-full h-[300px] sm:h-[250px] xs:h-[200px]"
                : "w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]"
            }`}
          >
            <img
              className="w-full h-full "
              src={product.images[0]}
              alt={product.name}
              
            />
            <ul className="absolute flex justify-center items-center gap-2 w-full -bottom-10 group-hover:bottom-3 transition-all duration-700">
              <li
                onClick={() => add_wishlist(product)}
                className="w-[38px] h-[38px] bg-white rounded-full flex justify-center items-center hover:bg-[#7fad39] hover:text-white transition-all"
              >
                <AiFillHeart />
              </li>
              <Link
                to={`/product/details/${product.slug}`}
                className="w-[38px] h-[38px] bg-white rounded-full flex justify-center items-center hover:bg-[#7fad39] hover:text-white transition-all"
              >
                <FaEye />
              </Link>
              <li
                onClick={() => add_cart(product._id)}
                className="w-[38px] h-[38px] bg-white rounded-full flex justify-center items-center hover:bg-[#7fad39] hover:text-white transition-all"
              >
                <AiOutlineShoppingCart />
              </li>
            </ul>
            {product.discount && (
              <div className="absolute top-2 left-2 flex justify-center items-center w-[38px] h-[38px] bg-red-500 text-white text-xs font-semibold rounded-full">
                {product.discount}%
              </div>
            )}
          </div>

          <div className="p-4 flex flex-col items-start gap-2 w-full">
            <h2 className="text-md font-medium text-slate-700 break-words whitespace-normal">
              {product.name}
            </h2>
            <h3><strong>{product.brand}</strong></h3>
            <div className="flex justify-between items-center w-full">
              <span className="text-lg font-bold text-slate-800">
                {formatPrice(product.price)}
              </span>
              <div className="flex gap-0.5 text-lg">
                <Rating ratings={product.rating} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopProducts;
