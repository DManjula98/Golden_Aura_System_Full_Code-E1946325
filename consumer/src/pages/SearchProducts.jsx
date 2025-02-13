import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useSearchParams } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { BsFillGridFill } from "react-icons/bs";
import { FaThList, FaFilter } from "react-icons/fa";
import ProductSection from "../components/products/ProductSection";
import {
  price_range_product,
  query_products,
} from "../store/reducers/homeReducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { messageClear } from "../store/reducers/cartReducer";

const SearchProducts = () => {
  const { products, categories, priceRang, parPage } = useSelector(
    (state) => state.home
  );
  let [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(true);
  const [styles, setStyles] = useState("grid");
  const [state, setState] = useState({ values: [505, 20000] });
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [expandedBrand, setExpandedBrand] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [rating, setRatingQ] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const perPage = 15;
  const [showSidebar, setShowSidebar] = useState(true);
  const { successMessage, errorMessage } = useSelector((state) => state.cart);
  const hasNotified = useRef(false);
  const uniqueBrands = [...new Set(products.map((product) => product.brand))];

  useEffect(() => {
    if (successMessage && !hasNotified.current) {
      toast.success(successMessage);
      dispatch(messageClear());
      hasNotified.current = true;
    }
    if (errorMessage && !hasNotified.current) {
      toast.error(errorMessage);
      dispatch(messageClear());
      hasNotified.current = true;
    }

    const timer = setTimeout(() => {
      hasNotified.current = false;
    }, 500);

    return () => clearTimeout(timer);
  }, [successMessage, errorMessage, dispatch]);

  useEffect(() => {
    dispatch(price_range_product());
  }, []);

  useEffect(() => {
    if (priceRang) {
      setState({
        values: [priceRang.low || 505, priceRang.high || 20000],
      });
    }
  }, [priceRang]);

  const handlePriceChange = (newPrice) => {
    setState({ values: newPrice });
    setPageNumber(1);
  };

  const queryCategory = (e, value, type) => {
    e.preventDefault();
    if (type === "category") {
      if (e.target.checked) {
        setSelectedCategory(value);
        setSelectedSubcategory("");
        setPageNumber(1);
      } else {
        setSelectedCategory("");
        setSelectedSubcategory("");
        setPageNumber(1);
      }
    } else if (type === "subcategory") {
      if (e.target.checked) {
        setSelectedSubcategory(value);
      } else {
        setSelectedSubcategory("");
      }
    } else if (type === "brand") {
      if (e.target.checked) {
        setSelectedBrand(value);
      } else {
        setSelectedBrand("");
      }
    }
  };

  const toggleExpand = (categoryName) => {
    setExpandedCategory(
      expandedCategory === categoryName ? null : categoryName
    );
  };

  const toggleExpandBrand = (brandName) => {
    setExpandedBrand(expandedBrand === brandName ? null : brandName);
  };

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    const searchValueFromUrl = searchParams.get("value");

    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }

    if (searchValueFromUrl) {
      setSearchValue(searchValueFromUrl);
    }

    dispatch(
      query_products({
        low: state.values[0],
        high: state.values[1],
        Category: categoryFromUrl || "",
        Subcategory: "",
        Brand: selectedBrand || "",
        searchValue: searchValueFromUrl || "",
        rating,
        sortPrice,
        pageNumber,
      })
    );
  }, [
    searchParams,
    state.values,
    rating,
    sortPrice,
    pageNumber,
    dispatch,
    selectedBrand,
  ]);

  const resetRating = () => {
    setRatingQ("");
    dispatch(
      query_products({
        low: state.values[0],
        high: state.values[1],
        Category: selectedCategory,
        Subcategory: selectedSubcategory,
        Brand: selectedBrand,
        rating: "",
        sortPrice,
        pageNumber,
      })
    );
  };

  const handleRatingChange = (newRating) => {
    setRatingQ(newRating);
    setPageNumber(1);
  };

  const totalProduct = products.length;
  const startIndex = (pageNumber - 1) * perPage;
  const paginatedProducts = products.slice(startIndex, startIndex + perPage);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const handleApplyFilters = () => {
    setShowSidebar(false);
  };

  return (
    <div>
      <Header />
      <section className='bg-[url("http://localhost:3000/images/banner/Shop.gif")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">Golden_Aura</h2>
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to="/">Home</Link>
                <span className="pt-1">
                  <MdOutlineKeyboardArrowRight />
                </span>
                <Link to="/shops">shop</Link>
                <span className="pt-1">
                  <MdOutlineKeyboardArrowRight />
                </span>
                <span>Products</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-1">
        <div className="flex w-[85%] mx-auto">
          <div className="hidden md:block">
            <div
              onClick={() => setShowSidebar(true)}
              className={`fixed duration-200 transition-all ${
                showSidebar ? "invisible" : "visible"
              } hidden md:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20`}
            ></div>
            <div
              className={`w-[300px] z-[9999] transition-all duration-200 fixed  ${
                showSidebar ? "-left-[300px]" : "left-0"
              } top-0 overflow-y-auto bg-white h-screen py-6 px-8`}
            >
              <div className="flex justify-start flex-col gap-6">
                <div className="mb-8">
                  <h2 className="text-lg font-bold text-gray-700 mb-4">
                    Category
                  </h2>
                  {categories.map((category, i) => (
                    <div key={i} className="mb-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedCategory === category.name}
                            onChange={(e) =>
                              queryCategory(e, category.name, "category")
                            }
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            className="text-gray-600 cursor-pointer"
                            htmlFor={category.name}
                          >
                            {category.name}
                          </label>
                        </div>
                        <button
                          onClick={() =>
                            setExpandedCategory(
                              expandedCategory === category.name
                                ? null
                                : category.name
                            )
                          }
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {expandedCategory === category.name ? "-" : "+"}
                        </button>
                      </div>

                      {expandedCategory === category.name &&
                        category.subcategories?.length > 0 && (
                          <ul className="pl-6 mt-2 text-gray-500">
                            {category.subcategories.map((subcategory) => (
                              <li key={subcategory._id} className="mb-2">
                                <input
                                  type="checkbox"
                                  checked={
                                    selectedSubcategory === subcategory.name
                                  }
                                  onChange={(e) =>
                                    queryCategory(
                                      e,
                                      subcategory.name,
                                      "subcategory"
                                    )
                                  }
                                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={subcategory.name}
                                  className="ml-2 cursor-pointer"
                                >
                                  {subcategory.name}
                                </label>
                              </li>
                            ))}
                          </ul>
                        )}
                    </div>
                  ))}
                </div>

                {/* Brand Filter */}
                <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-700 mb-4">Brand</h2>
                  {uniqueBrands.map((brand, i) => (
                    <div key={i} className="mb-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedBrand === brand}
                          onChange={(e) => queryCategory(e, brand, "brand")}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                         <label
                        className="text-gray-600 cursor-pointer"
                        htmlFor={brand}
                      >
                        {brand}
                      </label>
                      </div>
                      </div>
                  ))}
                </div>

                {/* Price Filter */}
                <div className="mb-8">
                  <h2 className="text-lg font-bold text-gray-700 mb-4">
                    Price
                  </h2>
                  <div>
                    <input
                      type="range"
                      min="505"
                      max="20000"
                      value={state.values[0]}
                      onChange={(e) =>
                        handlePriceChange([e.target.value, state.values[1]])
                      }
                      className="w-full mb-2"
                    />
                    <input
                      type="range"
                      min="505"
                      max="20000"
                      value={state.values[1]}
                      onChange={(e) =>
                        handlePriceChange([state.values[0], e.target.value])
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-gray-600 mt-2">
                      <span>Rs.{Math.floor(state.values[0])}</span>
                      <span>Rs.{Math.floor(state.values[1])}</span>
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-8">
                  <h2 className="text-lg font-bold text-gray-700 mb-4">
                    Rating
                  </h2>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((ratingValue) => (
                      <div
                        key={ratingValue}
                        onClick={() => handleRatingChange(ratingValue)}
                        className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                      >
                        {[...Array(5)].map((_, index) => {
                          return index < ratingValue ? (
                            <AiFillStar key={index} />
                          ) : (
                            <CiStar key={index} />
                          );
                        })}
                      </div>
                    ))}
                    <div
                      onClick={resetRating}
                      className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                    >
                      {[...Array(5)].map((_, index) => (
                        <CiStar key={index} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-9/12 md-lg:w-8/12 md:w-full">
              <div className="pl-8 md:pl-0">
                <div className="py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-start border">
                  <h2 className="text-lg font-medium text-slate-600">
                    {totalProduct} Products
                  </h2>
                  <div className="flex justify-center items-center gap-3 sm:w-auto">
                    <select
                      onChange={(e) => setSortPrice(e.target.value)}
                      className="p-1 border outline-0 text-slate-600 font-semibold"
                    >
                      <option value="">Sort By</option>
                      <option value="low-to-high">Low to High Price</option>
                      <option value="high-to-low">High to Low Price</option>
                    </select>

                    <div className="flex justify-center items-start gap-4 md-lg:hidden">
                      <div
                        onClick={() => setStyles("grid")}
                        className={`p-2 ${
                          styles === "grid" && "bg-slate-300"
                        } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}
                      >
                        <BsFillGridFill />
                      </div>
                      <div
                        onClick={() => setStyles("list")}
                        className={`p-2 ${
                          styles === "list" && "bg-slate-300"
                        } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}
                      >
                        <FaThList />
                      </div>
                    </div>
                    <div
                      className="justify-center items-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer lg:hidden md-lg:hidden md:flex xl:hidden hidden"
                      onClick={() => setShowSidebar(false)}
                    >
                      <FaFilter />
                    </div>
                  </div>
                </div>
                <ProductSection
                  products={paginatedProducts}
                  styles={styles}
                  totalProduct={totalProduct}
                  perPage={perPage}
                  pageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="flex w-[85%] mx-auto md:hidden">
          <div className="w-1/4 bg-gray-100 p-6 rounded-md shadow-md">
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-700 mb-4">Category</h2>
              {categories.map((category, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedCategory === category.name}
                        onChange={(e) =>
                          queryCategory(e, category.name, "category")
                        }
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        className="text-gray-600 cursor-pointer"
                        htmlFor={category.name}
                      >
                        {category.name}
                      </label>
                    </div>
                    <button
                      onClick={() =>
                        setExpandedCategory(
                          expandedCategory === category.name
                            ? null
                            : category.name
                        )
                      }
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {expandedCategory === category.name ? "-" : "+"}
                    </button>
                  </div>

                  {expandedCategory === category.name &&
                    category.subcategories?.length > 0 && (
                      <ul className="pl-6 mt-2 text-gray-500">
                        {category.subcategories.map((subcategory) => (
                          <li key={subcategory._id} className="mb-2">
                            <input
                              type="checkbox"
                              checked={selectedSubcategory === subcategory.name}
                              onChange={(e) =>
                                queryCategory(
                                  e,
                                  subcategory.name,
                                  "subcategory"
                                )
                              }
                              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={subcategory.name}
                              className="ml-2 cursor-pointer"
                            >
                              {subcategory.name}
                            </label>
                          </li>
                        ))}
                      </ul>
                    )}
                </div>
              ))}
            </div>

            <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-700 mb-4">Brand</h2>
                  {uniqueBrands.map((brand, i) => (
                    <div key={i} className="mb-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedBrand === brand}
                          onChange={(e) => queryCategory(e, brand, "brand")}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                         <label
                        className="text-gray-600 cursor-pointer"
                        htmlFor={brand}
                      >
                        {brand}
                      </label>
                      </div>
                      </div>
                  ))}
                </div>

            {/* Price Filter */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-700 mb-4">Price</h2>
              <div>
                <input
                  type="range"
                  min="505"
                  max="20000"
                  value={state.values[0]}
                  onChange={(e) =>
                    handlePriceChange([e.target.value, state.values[1]])
                  }
                  className="w-full mb-2"
                />
                <input
                  type="range"
                  min="505"
                  max="20000"
                  value={state.values[1]}
                  onChange={(e) =>
                    handlePriceChange([state.values[0], e.target.value])
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-gray-600 mt-2">
                  <span>Rs.{Math.floor(state.values[0])}</span>
                  <span>Rs.{Math.floor(state.values[1])}</span>
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-700 mb-4">Rating</h2>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((ratingValue) => (
                  <div
                    key={ratingValue}
                    onClick={() => handleRatingChange(ratingValue)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                  >
                    {[...Array(5)].map((_, index) => {
                      return index < ratingValue ? (
                        <AiFillStar key={index} />
                      ) : (
                        <CiStar key={index} />
                      );
                    })}
                  </div>
                ))}
                <div
                  onClick={resetRating}
                  className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                >
                  {[...Array(5)].map((_, index) => (
                    <CiStar key={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-9/12 md-lg:w-8/12 md:w-full">
            <div className="pl-8 md:pl-0">
              <div className="py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-start border">
                <h2 className="text-lg font-medium text-slate-600">
                  {totalProduct} Products
                </h2>
                <div className="flex justify-center items-center gap-3 sm:w-auto">
                  <select
                    onChange={(e) => setSortPrice(e.target.value)}
                    className="p-1 border outline-0 text-slate-600 font-semibold"
                  >
                    <option value="">Sort By</option>
                    <option value="low-to-high">Low to High Price</option>
                    <option value="high-to-low">High to Low Price</option>
                  </select>

                  <div className="flex justify-center items-start gap-4 md-lg:hidden">
                    <div
                      onClick={() => setStyles("grid")}
                      className={`p-2 ${
                        styles === "grid" && "bg-slate-300"
                      } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}
                    >
                      <BsFillGridFill />
                    </div>
                    <div
                      onClick={() => setStyles("list")}
                      className={`p-2 ${
                        styles === "list" && "bg-slate-300"
                      } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}
                    >
                      <FaThList />
                    </div>
                  </div>
                </div>
              </div>

              <ProductSection
                products={paginatedProducts}
                styles={styles}
                totalProduct={totalProduct}
                perPage={perPage}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SearchProducts;
