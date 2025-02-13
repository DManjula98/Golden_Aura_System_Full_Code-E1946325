import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { GiKnightBanner } from "react-icons/gi";
import Pagination from "../pagination";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  get_products,
  messageClear,
  delete_product,
} from "../../store/reducers/productReducer";
import { formatPrice } from "../../utils/formatUtils";

const Products = () => {
  const dispatch = useDispatch();
  const { products, totalProduct, loader, successMessage, errorMessage } =
    useSelector((state) => state.product);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_products(obj));
  }, [searchValue, currentPage, parPage]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4  bg-[#283046] rounded-md">
        <Search
          setParPage={setParPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />
        <div className="relative overflow-x-auto mt-5">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                  Image
                </th>
                <th scope="col" className="py-3 px-4">
                  Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Category
                </th>
                <th scope="col" className="py-3 px-4">
                  Sub-Category
                </th>
                <th scope="col" className="py-3 px-4">
                  Brand
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Discount
                </th>
                <th scope="col" className="py-3 px-4">
                  Stock
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <tr key={i}>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {i + 1}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <img
                      className="w-[45px] h-[45px]"
                      src={product.images[0]}
                      alt=""
                    />
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{product?.name?.slice(0, 16)}...</span>
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{product.category}</span>
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{product.subcategory || "N/A"}</span>{" "}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{product.brand}</span>
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{formatPrice(product.price)}</span>
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {product.discount === 0 ? (
                      <span>no discount</span>
                    ) : (
                      <span>{product.discount}%</span>
                    )}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{product.stock}</span>
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to={`/seller/dashboard/edit-product/${product._id}`}
                        className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50"
                      >
                        <FaEdit />
                      </Link>
                      <Link
                        to={`http://localhost:3000/product/details/${product.slug}`}
                        className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                      >
                        <FaEye />
                      </Link>
                      <button
                        onClick={() => dispatch(delete_product(product._id))}
                        className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50"
                      >
                        <FaTrash />
                      </button>
                      <Link
                        to={`/seller/dashboard/add-banner/${product._id}`}
                        className="p-[6px] bg-cyan-500 rounded hover:shadow-lg hover:shadow-cyan-500/50"
                      >
                        <GiKnightBanner />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalProduct <= parPage ? (
          ""
        ) : (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={50}
              parPage={parPage}
              showItem={4}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
