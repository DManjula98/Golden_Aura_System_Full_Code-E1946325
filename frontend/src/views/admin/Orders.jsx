import React, { useState, useEffect } from "react";
import { BsArrowBarDown } from "react-icons/bs";
import { Link } from "react-router-dom";
import Pagination from "../pagination";
import { formatPrice } from "../../utils/formatUtils";
import { get_admin_orders } from "../../store/reducers/orderReducer";
import { useSelector, useDispatch } from "react-redux";

const Orders = () => {
  const dispatch = useDispatch();
  const { totalOrder, myOrders } = useSelector((state) => state.order);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParpage] = useState(5);
  const [show, setShow] = useState("");

  useEffect(() => {
    dispatch(
      get_admin_orders({
        parPage: parseInt(parPage),
        page: parseInt(currentPage),
        searchValue,
      })
    );
  }, [parPage, currentPage, searchValue]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <div className="flex justify-between items-center">
          <select
            onChange={(e) => setParpage(parseInt(e.target.value))}
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] "
          >
            <option value="5">5</option>
            <option value="5">15</option>
            <option value="5">25</option>
          </select>
          <input
            className="px-4 py-2 hover:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] "
            type="text"
            placeholder="search"
          />
        </div>
        <div className="relative mt-5 overflow-x-auto">
          <div className="w-full text-sm text-left text-[#d0d2d6]">
            <div className="text-sm uppercase border-b border-slate-700">
              <div className="flex justify-between items-start">
                <div className="py-3 w-[25%]">Order Id</div>
                <div className="py-3 w-[13%]">Price</div>
                <div className="py-3 w-[18%]">Payment Status</div>
                <div className="py-3 w-[18%]">Order Status</div>
                <div className="py-3 w-[18%]">Action</div>
                <div className="py-3 w-[8%]">
                  <BsArrowBarDown />
                </div>
              </div>
            </div>
            {myOrders.map((o, i) => (
              <div className="text-[#d0d2d6]">
                <div className="flex justify-between items-start border-b border-slate-700">
                  <div className="py-4 w-[25%] font-medium whitespace-nowrap">
                    {o._id}
                  </div>
                  <div className="py-4 w-[13%]">{formatPrice(o.price)}</div>
                  <div className="py-4 w-[18%]">{o.payment_status}</div>
                  <div className="py-4 w-[18%]">{o.delivery_status}</div>
                  <div className="py-4 w-[18%]">
                    <Link to={`/admin/dashboard/order/details/${o._id}`}>
                      view
                    </Link>
                  </div>
                  <div
                    onClick={(e) => setShow(o._id)}
                    className="py-4 cursor-pointer w-[8%]"
                  >
                    <BsArrowBarDown />
                  </div>
                </div>
                <div
                  className={
                    show === o._id
                      ? "block border-b border-slate-700 bg-slate-800"
                      : "hidden"
                  }
                >
                  {o.suborder.map((so, i) => (
                    <div className="flex justify-start items-start border-b border-slate-700">
                      <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-3">
                        {so._id}
                      </div>
                      <div className="py-4 w-[13%]">
                        {formatPrice(so.price)}
                      </div>
                      <div className="py-4 w-[18%]">{so.payment_status}</div>
                      <div className="py-4 w-[18%]">{so.delivery_status}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {totalOrder <= parPage ? (
            ""
          ) : (
            <div className="w-full flex justify-end mt-4 bottom-4 right-4">
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={totalOrder}
                parPage={parPage}
                showItem={4}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
