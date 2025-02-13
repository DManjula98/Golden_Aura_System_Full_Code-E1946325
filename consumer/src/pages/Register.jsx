import React, { useEffect, useState } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {customer_register,messageClear} from "../store/reducers/authReducer";
import FadeLoader from 'react-spinners/FadeLoader'
import toast from 'react-hot-toast'

const Register = () => {
  const navigate = useNavigate()
  const { loader, successMessage, errorMessage, userInformation } = useSelector(state => state.auth)
  const dispatch =useDispatch()
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const register = (e) => {
    e.preventDefault();
    dispatch(customer_register(state))
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      if(userInformation){
        navigate("/login");
    }
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);


  return (
    <div>
      {
        loader && <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                    <FadeLoader />
                  </div>
      }
      <Header />
      <div class="bg-slate-200 min-h-screen flex items-center justify-center mt-4">
        <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-10">
          <div>
            <h2 class="text-center text-xl text-slate-600 font-bold mb-6">
              Register
            </h2>
            <form onSubmit={register} class="space-y-4">
              <div className="flex flex-col gap-1 mb-2">
                <label
                  htmlFor="name"
                  class="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  onChange={inputHandle}
                  value={state.name}
                  type="text"
                  id="name"
                  name="name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="name"
                  required
                />
              </div>
              <div className="flex flex-col gap-1 mb-2">
                <label
                  htmlFor="email"
                  class="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  onChange={inputHandle}
                  value={state.email}
                  type="email"
                  id="email"
                  name="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="email"
                  required
                />
              </div>
              <div className="flex flex-col gap-1 mb-4">
                <label
                  htmlFor="password"
                  class="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  onChange={inputHandle}
                  value={state.password}
                  type="password"
                  id="password"
                  name="password"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="password"
                  required
                />
              </div>
              <button
                type="submit"
                class="w-full py-2 px-4 bg-purple-500 shadow-lg hover:shadow-indigo-500/30 text-white font-bold rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </form>
          </div>
          <div className="text-center text-slate-600 pt-1">
            <p>
              You already have account ?{" "}
              <Link className="text-blue-500" to="/login">
                Login
              </Link>
            </p>
          </div>
          <div className="text-center text-slate-600 pt-1">
            <p>
              {" "}
              <a
                target="_black"
                className="text-blue-500"
                href="http://localhost:3001/login"
              >
                Login
              </a>{" "}
              seller account
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
