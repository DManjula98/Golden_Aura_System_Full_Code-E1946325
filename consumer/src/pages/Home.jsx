import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import FeatureProducts from "../components/products/FeatureProducts";
import Products from "../components/products/Products";
import Footer from "../components/Footer";
import {
  get_category,
  get_products,
  get_reviews_home,
} from "../store/reducers/homeReducer";
import RSection from "../components/RSection";
import Brands from "../components/Brands";

const Home = () => {
  const dispatch = useDispatch();
  const {
    products,
    latest_product,
    topRated_product,
    discount_product,
    review,
  } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(get_products());
  }, []);

  return (
    <div className="w-full ">
      <Header />
      <Banner />
      <div className="my-4">
        <Categories />
      </div>
      <div className="py-[45px]">
        <FeatureProducts products={products} />
      </div>
      <div>
        <RSection products={latest_product} />
      </div>
      <div className="my-3 mt-16">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
          <h2>Brands</h2>
          <div className="w-[100px] h-[4px] bg-[#7fad39] mt-4"></div>
        </div>
        <Brands />
      </div>
      <div className="py-10 mt-16">
        <div className="w-[85%] flex flex-wrap mx-auto">
          <div className="grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
            <div className="overflow-hidden">
              <Products title="Latest Product" products={latest_product} />
            </div>
            <div className="overflow-hidden">
              <Products title="Top Rated Product" products={topRated_product} />
            </div>
            <div className="overflow-hidden">
              <Products title="Discount Product" products={discount_product} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
