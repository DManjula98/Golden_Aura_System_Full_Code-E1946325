import React, { useEffect, useState } from "react";
import { formatPrice } from "../../utils/formatUtils";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  get_seller_order,
  seller_order_status_update,
  messageClear,
} from "../../store/reducers/orderReducer";

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { order, errorMessage, successMessage } = useSelector(
    (state) => state.order
  );
  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(get_seller_order(orderId));
  }, [orderId]);

  useEffect(() => {
    setStatus(order?.delivery_status);
  }, [order]);

  const status_update = (e) => {
    dispatch(
      seller_order_status_update({
        orderId,
        information: { status: e.target.value },
      })
    );
    setStatus(e.target.value);
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-2xl text-white font-bold">Order Details</h2>
          <select
            onChange={status_update}
            value={status}
            name=""
            id=""
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="warehouse">Warehouse</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="p-6 bg-gray-700 mt-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center text-lg text-white">
            <h2 className="font-semibold">Order Id : {order._id}</h2>
            <span className="text-sm text-gray-400">{order.date}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-6">
            <div className="w-full lg:w-1/3 p-4 bg-gray-800 rounded-md shadow-md">
              <h3 className="text-xl font-bold text-white mb-3">
                Deliver Information{" "}
              </h3>
              <p className="text-gray-300">
                <strong>Delivery to: </strong>
                {order.deliverInformation}
              </p>

              <p className="text-gray-300">
                <strong>Payment Status : </strong> {order.payment_status}
              </p>

              <p className="text-gray-300">
                <strong>Price : </strong> {formatPrice(order.price)}
              </p>
            </div>

            <div className="w-full p-4 bg-gray-800 rounded-md shadow-md">
              <h3 className="text-xl font-bold text-white mb-3">
                {" "}
                Order Products{" "}
              </h3>
              {order?.products?.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 mb-4 text-gray-300"
                >
                  <img
                    className="w-12 h-12 object-cover rounded-md"
                    src={p.images[0]}
                    alt=""
                  />
                  <div>
                    <h4 className="font-semibold text-white">{p.name}</h4>
                    <p>
                      <strong>Brand : </strong> {p.brand} |{" "}
                      <strong>Quantity : </strong> {p.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
