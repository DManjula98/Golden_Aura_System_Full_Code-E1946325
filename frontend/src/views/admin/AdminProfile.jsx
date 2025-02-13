import React, { useEffect, useState } from "react";
import { BsImages } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { PropagateLoader, FadeLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  admin_profile_image_upload,
  messageClear,
  updateProfile,
  adminUpdatePassword,
} from "../../store/reducers/authReducer";


const AdminProfile = () => {
  const dispatch = useDispatch();
  const { userInformaion, loader, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );
  const [isEditing, setIsEditing] = useState(false);

  const [updatedName, setUpdatedName] = useState(userInformaion?.name || "");
  const [updatedEmail, setUpdatedEmail] = useState(userInformaion?.email || "");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    new_password: "",
  });

  const handleNameChange = (e) => setUpdatedName(e.target.value);
  const handleEmailChange = (e) => setUpdatedEmail(e.target.value);

  const handleSaveChanges = () => {
    const updatedData = {
      id: userInformaion?._id, 
      name: updatedName,
      email: updatedEmail,
    };

    dispatch(updateProfile(updatedData))
      .unwrap()
      .then((res) => {
        console.log("Profile updated successfully:", res);
        toast.success("Profile updated successfully!"); 
        setIsEditing(false); 
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        toast.error("Failed to update profile."); 
      });
  };
  const add_image = (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      dispatch(admin_profile_image_upload(formData)); 
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, password, new_password } = formData;

      if (!email || !password || !new_password) {
        alert("All fields are required!");
        return;
      }
      console.log("Updated Data:", formData); 
      dispatch(adminUpdatePassword(formData));

      setFormData({
        email: "",
        password: "",
        new_password: "",
      });
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-6/12">
          <div className="w-full h-full p-4  bg-[#283046] rounded-md text-[#d0d2d6]">
            <div className="flex justify-center items-center py-3">
              {userInformaion?.image ? (
                <label
                  htmlFor="img"
                  className="h-full w-[300px] relative p-3 cursor-pointer overflow-hidden"
                >
                  <img
                    className="w-full h-full"
                    src={userInformaion?.image}
                    alt="Profile"
                  />
                  {loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              ) : (
                <label
                  className="flex justify-center items-center flex-col h-[210px] w-[300px] cursor-pointer border border-dashed hover:border-indigo-500 border-[#d0d2d6] relative"
                  htmlFor="img"
                >
                  <span>
                    <BsImages />
                  </span>
                  <span>Select Image</span>
                  {loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              )}
              <input
                onChange={add_image}
                type="file"
                className="hidden"
                id="img"
              />
            </div>
            <form>
              <div className="px-0 md:px-5 py-2">
                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                  <span
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer"
                  >
                    <FaEdit />
                  </span>
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="name">Name</label>
                    <input
                      className="outline-none px-3 py-1 border rounded-md text-slate-600"
                      type="text"
                      id="name"
                      value={updatedName}
                      onChange={handleNameChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                      className="outline-none px-3 py-1 border rounded-md text-slate-600"
                      type="email"
                      id="email"
                      value={updatedEmail}
                      onChange={handleEmailChange}
                      disabled={!isEditing}
                    />

                    <label htmlFor="role">Role</label>
                    <input
                      className="outline-none px-3 py-1 border rounded-md text-slate-600"
                      type="role"
                      placeholder="role"
                      name="role"
                      id="role"
                      value={userInformaion.role}
                      disabled={!isEditing} 
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSaveChanges}
                disabled={!isEditing}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
        <div className="w-full md:w-6/12">
          <div className="w-full pl-0 md:pl-7 mt-6 md:mt-0  ">
            <div className="bg-[#283046] rounded-md text-[#d0d2d6] p-4">
              <h1 className="text-[#d0d2d6] text-lg mb-3 font-semibold">
                Change Password
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="email"
                    placeholder="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="password">Old Password</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="password"
                    placeholder="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="n_password">New Password</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="password"
                    placeholder="new password"
                    name="new_password"
                    id="n_password"
                    value={formData.new_password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 mt-5 ">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
