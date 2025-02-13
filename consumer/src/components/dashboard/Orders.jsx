import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { get_orders } from "../../store/reducers/orderReducer";
import { formatPrice } from "../../utils/formatUtils";

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInformation } = useSelector((state) => state.auth);
  const { myOrders, order } = useSelector((state) => state.order);
  const [state, setState] = useState("all");

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    dispatch(get_orders({ status: state, customerId: userInformation.id }));
  }, [state]);

  const redirect = (order) => {
    let items = 0;
    if (Array.isArray(order.products)) {
      for (let i = 0; i < order.products.length; i++) {
        const productQuantity = order.products[i]?.quantity || 0; 
        items += productQuantity;
      }
    }
    console.log("Calculated items:", items);
    navigate("/payment", {
      state: {
        price: order.price,
        items,
        orderId: order._id,
      },
    });
    window.scrollTo(0, 0); 
  };

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-600">My Orders</h2>
        <select
          className="outline-none px-3 py-1 border rounded-md text-slate-600"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="all">--order status---</option>
          <option value="placed">Placed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
          <option value="warehouse">Warehouse</option>
        </select>
      </div>
      <div className="pt-4">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment status
                </th>
                <th scope="col" className="px-6 py-3">
                  Order status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((order, i) => (
                <tr key={i} className="bg-white border-b">
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {order._id}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {formatPrice(order.price)}{" "}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {order.payment_status}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {order.delivery_status}
                  </td>
                  <td scope="row" className="px-6 py-4">
                    <Link onClick={handleLinkClick} to={`/dashboard/order/details/${order._id}`}>
                      <span className="bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded">
                        view
                      </span>
                    </Link>
                    {order.payment_status !== "paid" && (
                      <span
                        onClick={() => redirect(order)}
                        className="bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded cursor-pointer"
                      >
                        Pay Now
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
