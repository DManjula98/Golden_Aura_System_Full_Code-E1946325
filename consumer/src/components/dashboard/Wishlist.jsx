import React, { useEffect } from "react";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Rating from "../Rating";
import {
  get_wishlist_products,
  remove_wishlist,
  messageClear,
} from "../../store/reducers/cartReducer";
import toast from "react-hot-toast";
import { formatPrice } from "../../utils/formatUtils";

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInformation } = useSelector((state) => state.auth);
  const { wishlist, wishlist_count, successMessage, errorMessage } =
    useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(get_wishlist_products(userInformation.id));
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage]);

  return (
    <div className="w-full grid grid-cols-5 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 ">
      {wishlist.map((product, i) => (
        <div
          key={i}
          className="border group transition-all duration-500 hover:shadow-md hover:-mt-3 bg-white"
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <div className="relative overflow-hidden">
            {product.discount !== 0 && (
              <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                {product.discount}%
              </div>
            )}

            <img
              className="sm:w-full w-full h-[240px]"
              src={product.images[0]}
              alt="product image"
            />
            <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
              <li
                onClick={() => dispatch(remove_wishlist(product._id))}
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all"
              >
                <AiFillHeart />
              </li>
              <Link
                to={`/product/details/${product.slug}`}
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all"
              >
                <FaEye />
              </Link>
            </ul>
          </div>
          <div className="py-3 text-slate-600 px-2">
            <h2>{product.name}</h2>
            <div className="flex justify-start items-center gap-3">
              <span className="text-lg  font-bold">
                {formatPrice(product.price)}
              </span>
              <div className="flex">
                <Rating ratings={product.ratings} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
