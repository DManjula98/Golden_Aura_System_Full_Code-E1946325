import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsImages } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { get_category } from "../../store/reducers/categoryReducer";
import { add_product, messageClear } from "../../store/reducers/productReducer";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/Utils";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { userInformaion } = useSelector((state) => state.auth);
  const { successMessage, errorMessage, loader } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(
      get_category({
        searchValue: "",
        parPage: "",
        page: "",
      })
    );
  }, [dispatch]);

  const [state, setState] = useState({
    name: "",
    description: "",
    mdescription: "",
    howToUse: "",
    ingredient: "",
    discount: "",
    price: "",
    brand: "",
    stock: "",
    shopName: "",
  });

  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [allSubcategory, setAllSubcategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cateShow, setCateShow] = useState(false);
  const [subCateShow, setSubCateShow] = useState(false);

  useEffect(() => {
    setAllCategory(categories);
  }, [categories]);

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      let srcValue = allCategory.filter((c) =>
        c.name.toLowerCase().includes(value.toLowerCase())
      );
      setAllCategory(srcValue);
    } else {
      setAllCategory(categories);
    }
  };

  const handleCategoryChange = (catName) => {
    setCateShow(false);
    setCategory(catName);
    setSubcategory(""); 
    setAllSubcategory(
      categories.find((c) => c.name === catName)?.subcategories || []
    );
  };

  const handleSubcategoryChange = (subCatName) => {
    setSubCateShow(false);
    setSubcategory(subCatName);
  };

  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);

  const imageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;

    if (length > 0) {
      setImages([...images, ...files]);
      let imageUrl = [];

      for (let i = 0; i < length; i++) {
        imageUrl.push({ url: URL.createObjectURL(files[i]) });
      }
      setImageShow([...imageShow, ...imageUrl]);
    }
  };

  const changeImage = (img, index) => {
    if (img) {
      let tempUrl = imageShow;
      let tempImages = images;

      tempImages[index] = img;
      tempUrl[index] = { url: URL.createObjectURL(img) };

      setImageShow([...tempUrl]);
      setImages([...tempImages]);
    }
  };

  const removeImage = (i) => {
    const filterImage = images.filter((img, index) => index !== i);
    const filterImageUrl = imageShow.filter((img, index) => index !== i);
    setImages(filterImage);
    setImageShow(filterImageUrl);
  };

  const logFormData = (formData) => {
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  };

  const add = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("description", state.description);
    formData.append("mdescription", state.mdescription);
    formData.append("howToUse", state.howToUse);
    formData.append("ingredient", state.ingredient);
    formData.append("price", state.price);
    formData.append("stock", state.stock);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("discount", state.discount);
    formData.append("shopName", userInformaion.shopInformation?.shopName);
    formData.append("brand", state.brand);

    images.forEach((image) => {
      formData.append("images", image);
    });

    logFormData(formData); 

    dispatch(add_product({ product: formData }));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        name: "",
        description: "",
        mdescription: "",
        howToUse: "",
        ingredient: "",
        discount: "",
        price: "",
        brand: "",
        stock: "",
      });
      setImageShow([]);
      setImages([]);
      setCategory("");
      setSubcategory("");
    }
  }, [successMessage, errorMessage, dispatch]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#d0d2d6] text-xl font-semibold">Add Product</h1>
          <Link
            className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2"
            to="/seller/dashboard/products"
          >
            Products
          </Link>
        </div>
        <div>
          <form onSubmit={add}>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Product name</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={(e) => setState({ ...state, name: e.target.value })}
                  value={state.name}
                  type="text"
                  placeholder="product name"
                  name="name"
                  id="name"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="brand">Product brand</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={(e) =>
                    setState({ ...state, brand: e.target.value })
                  }
                  value={state.brand}
                  type="text"
                  placeholder="product brand"
                  name="brand"
                  id="brand"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="category">Category</label>
                <input
                  readOnly
                  onClick={() => setCateShow(!cateShow)}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  value={category}
                  type="text"
                  placeholder="--select category--"
                  id="category"
                />
                <div
                  className={`absolute top-[101%] bg-slate-800 w-full transition-all ${
                    cateShow ? "scale-100" : "scale-0"
                  }`}
                >
                  <div className="w-full px-4 py-2 fixed">
                    <input
                      value={searchValue}
                      onChange={categorySearch}
                      className="px-3 py-1 w-full focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6] overflow-hidden"
                      type="text"
                      placeholder="search"
                    />
                  </div>
                  <div className="pt-14"></div>
                  <div className="flex justify-start items-start flex-col h-[200px] overflow-x-scroll">
                    {allCategory.map((category, i) => (
                      <span
                        key={i}
                        className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                          category === category.name && "bg-indigo-500"
                        }`}
                        onClick={() => handleCategoryChange(category.name)}
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="subcategory">Subcategory</label>
                <input
                  readOnly
                  onClick={() => setSubCateShow(!subCateShow)}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  value={subcategory}
                  type="text"
                  placeholder="--select subcategory--"
                  id="subcategory"
                />
                <div
                  className={`absolute top-[101%] bg-slate-800 w-full transition-all ${
                    subCateShow ? "scale-100" : "scale-0"
                  }`}
                >
                  <div className="flex flex-col h-[200px] overflow-x-scroll">
                    {allSubcategory.map((subcategory, i) => (
                      <span
                        key={i}
                        className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                          subcategory === subcategory.name && "bg-indigo-500"
                        }`}
                        onClick={() =>
                          handleSubcategoryChange(subcategory.name)
                        }
                      >
                        {subcategory.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="stock">Stock</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={(e) =>
                    setState({ ...state, stock: e.target.value })
                  }
                  value={state.stock}
                  type="number"
                  min="0"
                  placeholder="product stock"
                  name="stock"
                  id="stock"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="price">Price</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={(e) =>
                    setState({ ...state, price: e.target.value })
                  }
                  value={state.price}
                  type="number"
                  placeholder="price"
                  name="price"
                  id="price"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="discount">Discount</label>
                <input
                  min="0"
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={(e) =>
                    setState({ ...state, discount: e.target.value })
                  }
                  value={state.discount}
                  type="number"
                  placeholder="%discount%"
                  name="discount"
                  id="discount"
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="description">Description</label>
              <textarea
                rows={4}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={(e) =>
                  setState({ ...state, description: e.target.value })
                }
                value={state.description}
                placeholder="description"
                name="description"
                id="description"
              ></textarea>
            </div>

            <div className="flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="mdescription">Benefits</label>
              <textarea
                rows={10}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={(e) =>
                  setState({ ...state, mdescription: e.target.value })
                }
                value={state.mdescription || ""}
                placeholder="mdescription"
                name="mdescription"
                id="mdescription"
              ></textarea>
            </div>

            <div className="flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="howToUse">How to Use</label>
              <textarea
                rows={10}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={(e) =>
                  setState({ ...state, howToUse: e.target.value })
                }
                value={state.howToUse || ""}
                placeholder="howToUse"
                name="howToUse"
                id="howToUse"
              ></textarea>
            </div>

            <div className="flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="ingredient">Ingredients</label>
              <textarea
                rows={4}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={(e) =>
                  setState({ ...state, ingredient: e.target.value })
                }
                value={state.ingredient}
                placeholder="ingredient"
                name="ingredient"
                id="ingredient"
              ></textarea>
            </div>

            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 xs:gap-4 gap-3 w-full text-[#d0d2d6] mb-4">
              {imageShow.map((img, i) => (
                <div key={i} className="h-[180px] relative">
                  <label htmlFor={i}>
                    <img
                      className="w-full h-full rounded-sm"
                      src={img.url}
                      alt=""
                    />
                  </label>
                  <input
                    onChange={(e) => changeImage(e.target.files[0], i)}
                    type="file"
                    id={i}
                    className="hidden"
                  />
                  <span
                    onClick={() => removeImage(i)}
                    className="p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 text-white absolute top-1 right-1 rounded-full"
                  >
                    <IoCloseSharp />
                  </span>
                </div>
              ))}
              <label
                className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-indigo-500 w-full text-[#d0d2d6]"
                htmlFor="image"
              >
                <span>
                  <BsImages />
                </span>
                <span>select image</span>
              </label>
              <input
                multiple
                onChange={imageHandle}
                className="hidden"
                type="file"
                id="image"
              />
            </div>
            <div className="flex">
              <button
                disabled={loader ? true : false}
                className="bg-blue-500 w-[190px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  "Add product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
