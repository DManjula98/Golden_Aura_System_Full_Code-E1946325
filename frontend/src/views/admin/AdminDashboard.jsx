import React, { useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiProductHuntLine } from "react-icons/ri";
import Chart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "../../utils/formatUtils";
import moment from "moment";
import seller from "../../assets/manager.jpg";
import { get_admin_dashboard_index_data } from "../../store/reducers/dashboardIndexReducer";
import ReactApexChart from "react-apexcharts";

export const AdminDashboard = () => {
  const { userInformaion } = useSelector((state) => state.auth);
  const {
    totalSale,
    totalOrder,
    totalProduct,
    totalSeller,
    recentOrders,
    recentMessage,
    sellerDetails,
  } = useSelector((state) => state.dashboardIndex);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_admin_dashboard_index_data());
  }, []);

  //chart
  const state = {
    series: [
      {
        name: " Orders",
        data: [34, 65, 45, 343, 65, 34, 62, 62, 23, 45, 34, 62],
      },
      {
        name: " Revenue",
        data: [34, 65, 45, 343, 65, 34, 62, 62, 23, 45, 34, 62],
      },
      {
        name: "sellers",
        data: [78, 32, 34, 54, 65, 34, 21, 62, 23, 43, 34, 45],
      },
    ],
    options: {
      color: ["#181ee8", "#181ee8"],
      plotOptions: {
        redius: 30,
      },
      chart: {
        background: "transparent",
        foreColor: "#d0d2d6",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: ["smooth", "straight", "stepline"],
        lineCap: "butt",
        color: "#f0f0f0",
        width: 0.5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apl",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: {
        position: "top",
      },
      // to get bar chart
      responsive: [
        {
          breakpoint: 565,
          options: {
            xaxis: {
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apl",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
            },
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            chart: {
              height: "550px",
            },
          },
        },
      ],
    },
  };

  const chartState = {
    series: [
      totalOrder ? totalOrder : 0,
      totalProduct ? totalProduct : 0,
      totalSeller ? totalSeller : 0,
    ],
    options: {
      legend: {
        position: "top",
        labels: {
          colors: "#ffffff",
        },
      },
      labels: ["Total Orders", "Total Product", "Total Sellers"],
      colors: ["#6050DC", "#FF2E7E", "#FFAB05"],
      chart: {
        background: "transparent",
        foreColor: "#d0d2d6",
      },
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex justify-between items-center ps-5 bg-[#283046] rounded-md gap-3">
          <Link to="/admin/dashboard/orders">
            <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
              <h2 className="text-3xl font-bold">{formatPrice(totalSale)} </h2>
              <span className="text-md font-medium">Total Sales</span>
            </div>
          </Link>
          <div className="w-[46px] h-[44px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl ">
            <BsCurrencyDollar className="text-[#28c76f] shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center ps-5 bg-[#283046] rounded-md gap-3">
          <Link to="/admin/dashboard/category">
            <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
              <h2 className="text-3xl font-bold">{totalProduct}</h2>
              <span className="text-md font-medium">Products</span>
            </div>
          </Link>
          <div className="w-[46px] h-[44px] rounded-full bg-[#e000e81f] flex justify-center items-center text-xl ">
            <RiProductHuntLine className="text-[#cd00e8] shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center ps-5 bg-[#283046] rounded-md gap-3">
          <Link to="/admin/dashboard/sellers">
            <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
              <h2 className="text-3xl font-bold">{totalSeller}</h2>
              <span className="text-md font-medium">Sellers</span>
            </div>
          </Link>
          <div className="w-[46px] h-[44px] rounded-full bg-[#00cfe81f] flex justify-center items-center text-xl ">
            <FaUsers className="text-[#00cfe8] shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center ps-5 bg-[#283046] rounded-md gap-3">
          <Link to="/admin/dashboard/orders">
            <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
              <h2 className="text-3xl font-bold">{totalOrder}</h2>
              <span className="text-md font-medium">Orders</span>
            </div>
          </Link>
          <div className="w-[46px] h-[44px] rounded-full bg-[#7367f01f] flex justify-center items-center text-xl ">
            <AiOutlineShoppingCart className="text-[#7367f0] shadow-lg" />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap mt-7">
        <div className="w-full lg:w-7/12 lg:pr-3">
          <div className="w-full bg-[#283046] p-4 rounded-md">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>
        <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
          <div className="w-full bg-[#283046] p-4 rounded-md text-[#d0d2d6] ">
            <div className="flex justify-between items-center">
              <h2 className="cont-semibold text-lg text-[#d0d2d6] pb-3">
                Recent Seller Message
              </h2>
              <Link
                to="/admin/dashboard/chat-sellers"
                className="font-semibold text-sm text-[#d0d2d6]"
              >
                View All
              </Link>
            </div>
            {/* Additional content for Recent Seller Message */}
            <div className="flex flex-col gap-2 pt-6 text-[#d0d2d6]">
              <ol className="relative border-1 border-slate-600 ml-4">
                {recentMessage.map((m, i) => (
                  <li className="mb-3 ml-6">
                    <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#00d1e848] rounded-full z-10">
                      {m.senderId === userInformaion._id ? (
                        <img
                          className="w-full rounded-full h-full shadow-lg"
                          src={userInformaion.image}
                          alt=""
                        />
                      ) : (
                        <img
                          className="w-full rounded-full h-full shadow-lg"
                          src={seller}
                          alt=""
                        />
                      )}
                    </div>
                    <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <Link className="text-md font-normal">
                          {m.senderName}
                        </Link>
                        <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                          {moment(m.createdAt).startOf("hour").fromNow()}
                        </time>
                      </div>
                      <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                        {m.message}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-wrap mt-7">
        <div className="w-full lg:w-5/12 lg:pr-3">
          <div className="w-full bg-[#283046] p-4 rounded-md ">
            <ReactApexChart
              options={chartState.options}
              series={chartState.series}
              type="pie"
              width={400}
            />
          </div>
        </div>

        <div className="w-full lg:w-7/12 lg:pl-4 mt-6 lg:mt-0">
          <div className="w-full bg-[#283046] p-4 rounded-md text-[#d0d2d6] ">
            <div className="flex justify-between items-center">
              <h2 className="cont-semibold text-lg text-[#d0d2d6] pb-3">
                Seller Details
              </h2>
              <Link
                to="/admin/dashboard/sellers"
                className="font-semibold text-sm text-[#d0d2d6]"
              >
                View All
              </Link>
            </div>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-[#d0d2d6]">
                <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
                  <tr>
                    <th scope="col" className="py-3 px-4">
                      Seller Id
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Name
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Status
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Payment
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sellerDetails.map((d, i) => (
                    <tr key={i}>
                      <td
                        scope="row"
                        className="py-3 px-4 font-medium whitespace-nowrap"
                      >
                        #{d._id}
                      </td>
                      <td
                        scope="row"
                        className="py-3 px-4 font-medium whitespace-nowrap"
                      >
                        {d.name}
                      </td>

                      <td
                        scope="row"
                        className="py-3 px-4 font-medium whitespace-nowrap"
                      >
                        {d.status}
                      </td>
                      <td
                        scope="row"
                        className="py-3 px-4 font-medium whitespace-nowrap"
                      >
                        {d.payment}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-4 bg-[#283046] rounded-md mt-6">
        <div className="flex justify-between items-center">
          <h2 className="cont-semibold text-lg text-[#d0d2d6] pb-3">
            Recent Orders
          </h2>
          <Link
            to="/admin/dashboard/orders"
            className="font-semibold text-sm text-[#d0d2d6]"
          >
            View All
          </Link>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  Order Id
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Order Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Active
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((d, i) => (
                <tr key={i}>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    #{d._id}
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    {formatPrice(d.price)}
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{d.payment_status}</span>
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{d.delivery_status}</span>
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    <Link to={`/admin/dashboard/order/details/${d._id}`}>
                      View
                    </Link>
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
export default AdminDashboard;
