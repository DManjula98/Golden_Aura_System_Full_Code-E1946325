import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { get_order } from "../../store/reducers/orderReducer";
import { formatPrice } from "../../utils/formatUtils";

const Order = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { myOrder } = useSelector((state) => state.order);
  const { userInformation } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(get_order(orderId));
  }, [orderId]);

  return (
    <div className="bg-white p-6 ">
      <h2 className="text-gray-800 text-xl font-bold mb-4">
        #{myOrder._id} ,{" "}
        <span className="block text-sm text-gray-500">{myOrder.date}</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
          <h2 className="text-gray-700 font-semibold mb-2">
            Deliver to: {myOrder.deliverInformation?.name},{" "}
            {myOrder.deliverInformation?.province},{" "}
            {myOrder.deliverInformation?.district},{" "}
            {myOrder.deliverInformation?.city},{" "}
            {myOrder.deliverInformation?.area}
          </h2>
          <p className="text-sm text-gray-600 mb-2">
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium mr-1">
              Home
            </span>
            <span className="text-slate-600 text-sm">
              {myOrder.deliverInformation?.address}
            </span>
          </p>
          <p className="text-sm text-gray-600 font-semibold">
            Email to {userInformation.email}
          </p>
        </div>
        <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
          <h2 className="text-gray-700 font-semibold">
            Price:{" "}
            <span className="text-lg text-green-600">
              {" "}
              {formatPrice(myOrder.price)}{" "}
            </span>{" "}
            include Delivery Fee
          </h2>
          <p className="mt-2">
            Payment status:{" "}
            <span
              className={`py-[1px] text-xs px-3 ${
                myOrder.payment_status === "paid"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              } rounded-md `}
            >
              {myOrder.payment_status}
            </span>
          </p>
          <p className="mt-2">
            Order status:{" "}
            <span
              className={`py-[1px] text-xs px-3 ${
                myOrder.delivery_status === "paid"
                  ? "bg-indigo-100 text-indigo-800"
                  : "bg-red-100 text-red-800"
              } rounded-md `}
            >
              {myOrder.delivery_status}
            </span>
          </p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg text-gray-700 font-semibold mb-4">Products</h3>
        <div className="flex gap-5 flex-col">
          {myOrder.products?.map((product, i) => (
            <div key={i}>
              <div className="flex gap-5 justify-start items-center text-slate-600">
                <div className="flex gap-2">
                  <img
                    className="w-[55px] h-[55px]"
                    src={product.images[0]}
                    alt="image"
                  />
                  <div className="flex text-sm flex-col justify-start items-start">
                    <Link className="text-gray-800 font-medium text-lg hover:text-indigo-600">
                      {product.name}
                    </Link>
                    <p className="text-sm text-gray-600">
                      <span className="block">Brand: {product.brand}</span>
                      <span className="block">
                        Quantity: {product.quantity}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="text-right ml-auto">
                  <h4 className="text-orange-600 text-lg font-bold">
                    {" "}
                    {formatPrice(
                      product.price -
                        Math.floor((product.price * product.discount) / 100)
                    )}
                  </h4>
                  <p className="text-sm text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </p>
                  <p className="text-xs text-red-500">-{product.discount}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
