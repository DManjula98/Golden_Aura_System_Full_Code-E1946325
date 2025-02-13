import React, { useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { Link, redirect, useNavigate } from "react-router-dom";
import { get_dashboard_index_data } from "../../store/reducers/dashboardReducer";
import { formatPrice } from "../../utils/formatUtils";

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInformation } = useSelector((state) => state.auth);
  const { totalOrder, pendingOrder, cancelledOrder, recentOrders } = useSelector((state) => state.dashboard);

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    dispatch(get_dashboard_index_data(userInformation.id));
  }, []);

  const redirect = (order) => {
    let items = 0;
    for (let i = 0; i < order.length; i++) {
      items = order.products[i].quantity + items;
    }
    navigate("/payment", {
      state: {
        price: order.price,
        items,
        orderId: order._id,
      },
    });
  };

  return (
    <div>
      <div className="grid grid-cols-3 md:grid-cols-1 gap-5">
        <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl ">
            <span className="text-xl text-green-800">
              <AiOutlineShoppingCart />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">{totalOrder}</h2>
            <span>Orders</span>
          </div>
        </div>
        <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-blue-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl ">
            <span className="text-xl text-blue-800">
              <AiOutlineShoppingCart />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">{pendingOrder}</h2>
            <span>Pending Orders</span>
          </div>
        </div>
        <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-red-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl ">
            <span className="text-xl text-red-800">
              <AiOutlineShoppingCart />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">{cancelledOrder}</h2>
            <span>Cancelled Orders</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 mt-5 rounded-md">
        <h2 className="text-lg font-semibold text-slate-600">Recent Orders</h2>
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
                {recentOrders.map((order, i) => (
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
                      {formatPrice(order.price)}
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
    </div>
  );
};

export default Index;
