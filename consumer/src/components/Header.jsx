import React, { useEffect, useRef, useState } from "react";
import { GrMail } from "react-icons/gr";
import {
  FaFacebookSquare,
  FaList,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaUser,
  FaLock,
} from "react-icons/fa";
import {
  MdOutlineKeyboardArrowDown,
  MdArrowRight,
} from "react-icons/md";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillShopping, AiFillHeart } from "react-icons/ai";
import { IoIosCall } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import {
  get_cart_products,
  get_wishlist_products,
  reset_wishlist_count,
} from "../store/reducers/cartReducer";

const Header = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.home);
  const { userInformation } = useSelector((state) => state.auth);
  const { cart_products_count, wish_count } = useSelector(
    (state) => state.cart
  );
  const [categoryShow, setCategoryShow] = useState(false);
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [showShidebar, setShowShidebar] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const subCategoryPanelRef = useRef(null);
  const categoryPanelRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [subCategoryShow, setSubCategoryShow] = useState(false);

  const toggleCategory = (categoryName) => {
    if (activeCategory === categoryName) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryName);
    }
  };

  useEffect(() => {
    if (!activeSubCategory) {
      setSubCategoryShow(false);
    } else {
      setSubCategoryShow(true);
    }
  }, [activeSubCategory]);

  const handleSearch = () => {
    const searchQuery = searchValue ? `&value=${searchValue}` : "";
    const categoryQuery = selectedCategory
      ? `category=${selectedCategory}`
      : "";

    const finalQuery = `${categoryQuery}${searchQuery}`;

    navigate(`/products/search?${finalQuery}`);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowSubCategory(true);
    setCategoryShow(true);
  };

  const handleSubCategoryClick = () => {
    setCategoryShow(false);
    setShowSubCategory(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryPanelRef.current &&
        !categoryPanelRef.current.contains(event.target)
      ) {
        setCategoryShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleArrowClick = () => {
    setShowSubCategory(!showSubCategory);
  };

  const handleCategoryPanelClick = () => {
    setCategoryShow(!categoryShow);
    setShowSubCategory(false);
    setCategoryShow(false);
  };

  const handleMouseEnter = () => {
    setShowSubCategory(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      if (!subCategoryPanelRef.current.contains(document.activeElement)) {
        setShowSubCategory(false);
      }
    }, 200);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryPanelRef.current &&
        !categoryPanelRef.current.contains(event.target)
      ) {
        setCategoryShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        subCategoryPanelRef.current &&
        !subCategoryPanelRef.current.contains(event.target) &&
        categoryPanelRef.current &&
        !categoryPanelRef.current.contains(event.target)
      ) {
        setShowSubCategory(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const redirect_cart_page = () => {
    if (userInformation) {
      navigate(`/cart`);
    } else {
      navigate(`/login`);
    }
  };

  useEffect(() => {
    if (userInformation) {
      dispatch(get_cart_products(userInformation.id));
      dispatch(get_wishlist_products(userInformation.id));
    } else {
      dispatch(reset_wishlist_count());
    }
  }, [userInformation]);

  const handleCategoryToggle = (categoryId) => {
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const toggleAllCategories = () => {
    setShowAllCategories((prev) => !prev);
  };


  return (
    <div className="w-full bg-white">
      <div className="header-top bg-[#eeeeee] md-lg:hidden">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="flex w-full justify-between items-center h-[50px] text-slate-500">
            <ul className="flex justify-start items-center gap-8">
              <li className="flex relative justify-center items-center gap-2 text-sm after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]">
                <span>
                  <GrMail />
                </span>

                <span>
                  <u>
                    <a
                      href="https://mail.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      dilrukshimanjula14@gmail.com{" "}
                    </a>
                  </u>
                </span>
              </li>
              <span>Golden Aura - "Unlock Your Natural Beauty"</span>
            </ul>
            <div>
              <div className="flex justify-center items-center gap-10">
                <div className="flex justify-center items-center gap-4">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookSquare />
                  </a>
                  <a
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedinIn />
                  </a>
                  <a
                    href="https://www.github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub />
                  </a>
                </div>
                <div className="w-[35px] flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute before:absolute before:h-[18px] before:bg-[#afafaf] before:w-[1px] before:-left-[20px]">
                  <img src="http://localhost:3000/images/flag.png" alt="" />
                  <span>
                    <MdOutlineKeyboardArrowDown />
                  </span>
                  <ul className="absolute invisible transition-all to-12 rounded-sm duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10">
                    <li>English</li>
                    <li>Sinhala</li>
                  </ul>
                </div>
                {userInformation ? (
                  <Link
                    className="flex cursor-pointer justify-center items-center gap-2 text-sm"
                    to="/dashboard"
                  >
                    <span>
                      <FaUser />
                    </span>
                    <span>{userInformation?.name}</span>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="flex cursor-pointer justify-center items-center gap-2 text-sm"
                  >
                    <span>
                      <FaLock />
                    </span>
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-white">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap">
            <div className="md-lg:w-full w-3/12 md-lg:pt-4">
              <div className="flex justify-between items-center">
                <Link to="/">
                  <img src="http://localhost:3000/images/logo.png" alt="logo" />
                </Link>
                <div
                  className="justify-center items-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer lg:hidden md-lg:flex xl:hidden hidden"
                  onClick={() => setShowShidebar(false)}
                >
                  <span>
                    <FaList />
                  </span>
                </div>
              </div>
            </div>
            <div className="md-lg:w-full w-9/12">
              <div className="flex justify-between md-lg:justify-center items-center flex-wrap pl-8">
                <ul className="flex justify-start items-start gap-8 text-sm font-bold uppercase md-lg:hidden">
                  <li>
                    <Link
                      to="/"
                      className={`p-2 block ${
                        pathname === "/" ? "text-[#7fad39]" : "text-slate-600"
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/shops"
                      className={`p-2 block ${
                        pathname === "/shop"
                          ? "text-[#7fad39]"
                          : "text-slate-600"
                      }`}
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      className={`p-2 block ${
                        pathname === "/blog"
                          ? "text-[#7fad39]"
                          : "text-slate-600"
                      }`}
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className={`p-2 block ${
                        pathname === "/about"
                          ? "text-[#7fad39]"
                          : "text-slate-600"
                      }`}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className={`p-2 block ${
                        pathname === "/contact"
                          ? "text-[#7fad39]"
                          : "text-slate-600"
                      }`}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
                <div className="flex md-lg:hidden justify-center items-center gap-5">
                  <div className="flex justify-center gap-5">
                    <div
                      onClick={() =>
                        navigate(
                          userInformation ? "/dashboard/my-wishlist" : "/login"
                        )
                      }
                      className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
                    >
                      <span className="text-xl text-red-500">
                        <AiFillHeart />
                      </span>
                      {wish_count !== 0 && (
                        <div className="w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                          {wish_count}
                        </div>
                      )}
                    </div>
                    <div
                      onClick={redirect_cart_page}
                      className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
                    >
                      <span className="text-xl text-orange-500">
                        <AiFillShopping />
                      </span>
                      {cart_products_count !== 0 && (
                        <div className="w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                          {cart_products_count}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md-lg:block">
        <div
          onClick={() => setShowShidebar(true)}
          className={`fixed duration-200 transition-all ${
            showShidebar ? "invisible" : "visible"
          } hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20`}
        ></div>
        <div
          className={`w-[300px] z-[9999] transition-all duration-200 fixed  ${
            showShidebar ? "-left-[300px]" : "left-0"
          } top-0 overflow-y-auto bg-white h-screen py-6 px-8`}
        >
          <div className="flex justify-start flex-col gap-6">
            <Link to="/">
              <img src="http://localhost:3000/images/logo.png" alt="logo" />
            </Link>
            <div className="flex justify-star items-center gap-10">
              <div className="w-[35px] flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute">
                <img src="http://localhost:3000/images/flag.png" alt="" />
                <span>
                  <MdOutlineKeyboardArrowDown />
                </span>
                <ul className="absolute invisible transition-all to-12 rounded-sm duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10">
                  <li>English</li>
                  <li>Sinhala</li>
                </ul>
              </div>
              {userInformation ? (
                <Link
                  className="flex cursor-pointer justify-center items-center gap-2 text-sm"
                  to="/dashboard"
                >
                  <span>
                    <FaUser />
                  </span>
                  <span>{userInformation?.name}</span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="flex cursor-pointer justify-center items-center gap-2 text-sm"
                >
                  <span>
                    <FaLock />
                  </span>
                  <span>Login</span>
                </Link>
              )}
              {/* <div>{user?.name}</div>
                    <button onClick={logoutHandler}>Logout</button> */}
            </div>
            <ul className="flex flex-col justify-start items-start  text-md font-semibold uppercase">
              <li>
                <Link
                  to="/"
                  className={`py-2 block ${
                    pathname === "/" ? "text-[#7fad39]" : "text-slate-600"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={"/shops"}
                  className={`py-2 block ${
                    pathname === "/shops" ? "text-[#7fad39]" : "text-slate-600"
                  }`}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className={`py-2 block ${
                    pathname === "/blog" ? "text-[#7fad39]" : "text-slate-600"
                  }`}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`py-2 block ${
                    pathname === "/about" ? "text-[#7fad39]" : "text-slate-600"
                  }`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to={"/contact"}
                  className={`py-2 block ${
                    pathname === "/contact"
                      ? "text-[#7fad39]"
                      : "text-slate-600"
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
            <div className="w-64 bg-gray-100 p-4">
              <ul>
                <li className="py-2 text-lg font-bold text-gray-700">
                  <Link to="/" className="block">
                    All Categories
                  </Link>
                </li>

                {categories.map((category, index) => (
                  <li key={index} className="mt-4">
                    <div
                      className="flex items-center justify-between cursor-pointer text-gray-600 hover:text-green-600"
                      onClick={() => toggleCategory(category.name)}
                    >
                      <span className="flex items-center gap-2">
                        {category.icon} {category.name}
                      </span>
                      {category.subcategories.length > 0 && (
                        <span>
                          {activeCategory === category.name ? (
                            <IoMdArrowDropup />
                          ) : (
                            <IoMdArrowDropdown />
                          )}
                        </span>
                      )}
                    </div>

                    {activeCategory === category.name && (
                      <ul className="mt-2 ml-4 text-gray-500">
                        {category.subcategories.map((sub, subIndex) => (
                          <li key={subIndex} className="py-1">
                            <Link
                              to={`/products?category=${
                                category.name
                              }&subcategory=${sub.name.toLowerCase()}`}
                              className="hover:text-green-600"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-start  items-center gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookSquare />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
            </div>
            <div className="w-full flex justify-end md-lg:justify-start gap-3 items-center">
              <div className="w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center">
                <span>
                  <IoIosCall />
                </span>
              </div>
              <div className="flex justify-end flex-col gap-1">
                <h2 className="text-sm font-medium text-slate-700">
                  0769364744 / 0718182109
                </h2>
                <span className="text-xs">support 33/45 time</span>
              </div>
            </div>
            <ul className="flex flex-col justify-start items-start gap-3 text-[#1c1c1c]">
              <li className="flex justify-start items-center gap-2  text-sm">
                <span>
                  <GrMail />
                </span>
                <span>dilrukshimanjula14@gmail.com</span>
              </li>
              <span>Golden Aura - "Unlock Your Natural Beauty"</span>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-[80%] lg:w-[90%] mx-auto relative">
        <div className="flex w-full flex-wrap md-lg:gap-8 ">
          <div className="w-[250px] md-lg:w-full flex justify-between items-center px-4 py-3 bg-violet-500 text-white md:hidden md-lg:hidden ">
            <button
              onClick={() => {
                setCategoryShow(!categoryShow);

                setShowSubCategory(false);
              }}
              className="flex items-center gap-2 "
            >
              <FaList />
              <span>All Categories</span>
            </button>
          </div>

          <div className="w-9/12 pl-8 md-lg:pl-0 md-lg:w-full">
            <div className="flex flex-wrap w-full justify-between items-center md-lg:gap-6 pl-20">
              {/* Search Bar and Category Selector */}
              <div className="w-8/12 md-lg:w-full">
                <div className="flex border h-[50px] items-center relative gap-5">
                  <div className="relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px] md:hidden ">
                    <select
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-[150px] text-slate-600 font-semibold bg-transparent px-2 h-full outline-0 border-none"
                    >
                      <option value="">Select category</option>
                      {categories.map((category, i) => (
                        <option key={i} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <input
                    className="w-full relative bg-transparent text-slate-500 outline-0 px-3 h-full"
                    type="text"
                    placeholder="what do you need"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <button
                    className="bg-violet-500 right-0 absolute px-8 h-full font-semibold uppercase text-white"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="w-4/12 block md-lg:hidden md-lg:w-full md-lg:pl-0 pl-20">
                <div className="w-full flex justify-between items-center gap-3">
                  <div className="flex items-center gap-4">
                    <div className="w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center">
                      <span>
                        <IoIosCall />
                      </span>
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <h2 className="text-md font-sans text-slate-700 flex gap-4">
                        <span>0769364744</span>
                        <span>/</span>
                        <span>0718182109</span>
                      </h2>

                      <span className="text-sm text-slate-600">
                        Support 33/45 time
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto relative">
          <div>
            <div className="flex w-full flex-wrap md-lg:gap-8">
              <div className="w-full flex  md:hidden md-lg:hidden">
                {/* Category Panel */}
                <div
                  className={`absolute z-50 bg-white transition-all duration-500 h-auto overflow-hidden ${
                    categoryShow ? "w-[250px] border-t" : "w-0 border-0"
                  }`}
                >
                  <div className="bg-violet-500 text-white px-4 py-3 font-bold flex items-center justify-between">
                    <span>All Categories</span>
                    <MdOutlineKeyboardArrowDown
                      className={`transition-transform duration-300 ${
                        categoryShow ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <ul className="divide-y max-h-[calc(100%-50px)] overflow-auto">
                    {categories.map((category) => (
                      <li
                        key={category.id}
                        className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          handleCategoryClick(category);
                          setShowSubCategory(true);
                          setSelectedCategory(category);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span>{category.name}</span>
                        </div>
                        <MdArrowRight />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Subcategory Panel */}
          {showSubCategory && selectedCategory && (
            <div
              ref={subCategoryPanelRef}
              className="absolute z-40 bg-white w-[250px] left-[250px] top-0 h-auto border-l md:hidden md-lg:hidden"
            >
              <div className="bg-violet-500 text-white px-4 py-3 font-bold">
                {selectedCategory.name}
              </div>
              <ul className="divide-y max-h-[calc(100%-50px)] overflow-auto">
                {selectedCategory.subcategories.map((subcategory) => (
                  <li
                    key={subcategory.id}
                    className="px-4 py-3 cursor-pointer hover:bg-gray-100"
                  >
                    <Link
                      to={`/products?category=${selectedCategory.name}&subcategory=${subcategory.name}`}
                      onClick={handleSubCategoryClick}
                      className="text-gray-800 hover:text-violet-500"
                    >
                      {subcategory.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
