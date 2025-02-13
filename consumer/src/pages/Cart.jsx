import React, { useEffect } from "react";
import { Link, redirect } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  get_cart_products,
  delete_cart_product,
  messageClear,
  quantity_increment,
  quantity_decrement,
} from "../store/reducers/cartReducer";
import { formatPrice } from "../utils/formatUtils";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInformation } = useSelector((state) => state.auth);
  const {
    cart_products,
    outofstock_products,
    buy_product_item,
    delivery_fee,
    price,
    successMessage,
  } = useSelector((state) => state.cart);

  const redirect = () => {
    navigate("/delivery", {
      state: {
        products: cart_products,
        price: price,
        delivery_fee: delivery_fee,
        items: buy_product_item,
      },
    });
  };

  useEffect(() => {
    dispatch(get_cart_products(userInformation.id));
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      dispatch(get_cart_products(userInformation.id));
    }
  }, [successMessage]);

  const increment = (quantity, stock, cart_id) => {
    const temp = quantity + 1;
    if (temp <= stock) {
      dispatch(quantity_increment(cart_id));
    }
  };

  const decrement = (quantity, cart_id) => {
    const temp = quantity - 1;
    if (temp !== 0) {
      dispatch(quantity_decrement(cart_id));
    }
  };
  
  return (
    <div>
      <Header />
      <section className='bg-[url("http://localhost:3000/images/banner/cart.jpg")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">Golden_Aura</h2>
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to="/">Home</Link>
                <span className="pt-2">
                  <MdOutlineKeyboardArrowRight />
                </span>
                <span>Cart</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90] mx-auto py-16">
          {cart_products.length > 0 || outofstock_products.length > 0 ? (
            <div className="flex flex-wrap">
              <div className="w-[67%] md-lg:w-full">
                <div className="pr-3 md-lg:pr-0">
                  <div className="flex flex-col gap-3">
                    <div className="bg-white p-4">
                      <h2 className="text-md text-green-500 font-semibold">
                        Stock Products {cart_products.length}
                      </h2>
                    </div>
                    {cart_products.map((product, i) => (
                      <div className="flex bg-white p-4 flex-col gap-2">
                        <div className="flex justify-start items-center">
                          <h2 className="text-md text-slate-600">
                            {product.shopName}
                          </h2>
                        </div>
                        {product.products.map((pt, i) => (
                          <div className="w-full flex flex-wrap">
                            <div className="flex sm:w-full gap-2 w-7/12">
                              <div className="flex gap-2 justify-start items-center">
                                <img
                                  className="w-[80px] h-[80px]"
                                  src={pt.productInformation.images[0]}
                                  alt="product image"
                                />
                                <div className="pr-4 text-slate-600">
                                  <h2 className="text-md">
                                    {" "}
                                    Brand : {pt.productInformation.name}
                                  </h2>
                                  <span className="text-sm">
                                    {pt.productInformation.brand}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                              <div className="pl-4 sm:pl-0">
                                <h2 className="text-lg text-orange-500">
                                  {formatPrice(
                                    pt.productInformation.price -
                                      Math.floor(
                                        (pt.productInformation.price *
                                          pt.productInformation.discount) /
                                          100
                                      )
                                  )}
                                </h2>
                                <p className="line-through">
                                  {formatPrice(pt.productInformation.price)}
                                </p>
                                <p>-{pt.productInformation.discount}%</p>
                              </div>
                              <div className="flex gap-2 flex-col">
                                <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                  <div
                                    onClick={() =>
                                      decrement(pt.quantity, pt._id)
                                    }
                                    className="px-3 cursor-pointer"
                                  >
                                    -
                                  </div>
                                  <div className="px-3">{pt.quantity}</div>
                                  <div
                                    onClick={() =>
                                      increment(
                                        pt.quantity,
                                        pt.productInformation.stock,
                                        pt._id
                                      )
                                    }
                                    className="px-3 cursor-pointer"
                                  >
                                    +
                                  </div>
                                </div>
                                <button
                                  onClick={() =>
                                    dispatch(delete_cart_product(pt._id))
                                  }
                                  className="px-5 py-[3px] bg-red-500 text-white"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                    {outofstock_products.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <div className="bg-white p-4">
                          <h2 className="text-md text-red-500 font-semibold">
                            Out of Stock {outofstock_products.length}
                          </h2>
                        </div>
                        <div className="bg-white p-4">
                          {outofstock_products.map((product, i) => (
                            <div key={i} className="w-full flex flex-wrap">
                              <div className="flex sm:w-full gap-2 w-7/12">
                                <div className="flex gap-2 justify-start items-center">
                                  <img
                                    className="w-[80px] h-[80px]"
                                    src={product.products[0].images[0]}
                                    alt="product image"
                                  />
                                  <div className="pr-4 text-slate-600">
                                    <h2 className="text-md">
                                      {product.products[0].name}
                                    </h2>
                                    <span className="text-sm">
                                      Brand : {product.products[0].brand}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                                <div className="pl-4 sm:pl-0">
                                  <h2 className="text-lg text-orange-500">
                                    Rs.{" "}
                                    {product.products[0].price -
                                      Math.floor(
                                        (product.products[0].price *
                                          product.products[0].discount) /
                                          100
                                      )}
                                  </h2>
                                  <p className="line-through">
                                    Rs. {product.products[0].price}
                                  </p>
                                  <p>-{product.products[0].discount}%</p>
                                </div>
                                <div className="flex gap-2 flex-col">
                                  <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                    <div
                                      onClick={() =>
                                        decrement(product.quantity, product._id)
                                      }
                                      className="px-3 cursor-pointer"
                                    >
                                      -
                                    </div>
                                    <div className="px-3">
                                      {product.quantity}
                                    </div>
                                    <div
                                      onClick={() =>
                                        decrement(
                                          product.quantity,
                                          product.products[0].stock,
                                          product._id
                                        )
                                      }
                                      className="px-3 cursor-pointer"
                                    >
                                      +
                                    </div>
                                  </div>
                                  <button
                                    onClick={() =>
                                      dispatch(delete_cart_product(product._id))
                                    }
                                    className="px-5 py-[3px] bg-red-500 text-white"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-[33%] md-lg:w-full">
                <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                  {cart_products.length > 0 && (
                    <div className="bg-white p-3 text-slate-600 flex flex-col gap-3">
                      <h2 className="text-xl font-bold">Order Summary</h2>
                      <div className="flex justify-between items-center">
                        <span> {buy_product_item}Item</span>
                        <span>{formatPrice(price)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Delivery Fee</span>
                        <span>{formatPrice(delivery_fee)}</span>
                      </div>
                      {/* <div className="flex gap-2">
                        <input
                          className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-500 rounded-sm"
                          type="text"
                          placeholder="Input Vauchar Coupon"
                        />
                        <button className="px-5 py-[1px] bg-blue-500 text-white rounded-sm uppercase text-sm">
                          Apply
                        </button>
                      </div> */}
                      <div className="flex justify-between items-center">
                        <span>Total</span>
                        <span className="text-lg text-orange-500">
                          {formatPrice(price + delivery_fee)}
                        </span>
                      </div>
                      <button
                        onClick={redirect}
                        className="px-5 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-sm text-white uppercase"
                      >
                        Proceed to checkout <b>{buy_product_item}</b>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Link className="px-4 py-1 bg-indigo-500 text-white" to="/shops">
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Cart;
