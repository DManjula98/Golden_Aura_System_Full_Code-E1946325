import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

export const admin_login = createAsyncThunk(
  "auth/admin_login",
  async (information, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/admin-login", information, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_login = createAsyncThunk(
  "auth/seller_login",
  async (information, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/seller-login", information, {
        withCredentials: true,
      });
      console.log(data)
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_register = createAsyncThunk(
  "auth/seller_register",
  async (information, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(information)
      const { data } = await api.post("/seller-register", information, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const profile_image_upload = createAsyncThunk(
  'auth/profile_image_upload',
  async (image, { rejectWithValue, fulfillWithValue }) => {
      try {
          const { data } = await api.post('/profile-image-upload', image, { withCredentials: true })
          return fulfillWithValue(data)
      } catch (error) {
          return rejectWithValue(error.response.data)
      }
  }
)

export const profile_information_add = createAsyncThunk(
  'auth/profile_information_add',
  async (information, { rejectWithValue, fulfillWithValue }) => {
      try {
          const { data } = await api.post('/profile-information-add', information, { withCredentials: true })
          return fulfillWithValue(data)
      } catch (error) {
          return rejectWithValue(error.response.data)
      }
  }
)

export const get_user_information = createAsyncThunk(
  "auth/get_user_information",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/get-user", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const returnRole = (token)=>{
  if(token){
    const decodeToken = jwtDecode(token)
    const expireTime = new Date(decodeToken.exp * 1000)
    if(new Date()>expireTime){
      localStorage.removeItem('accessToken')
      return ''
    }else{
      return decodeToken.role
    }
  }else{
    return ''
  }
}

export const admin_profile_image_upload = createAsyncThunk(
  'auth/admin_profile_image_upload',
  async (image, { rejectWithValue, fulfillWithValue }) => {
      try {
          const { data } = await api.post('/admin-profile-image-upload', image, { withCredentials: true })
          return fulfillWithValue(data)
      } catch (error) {
          return rejectWithValue(error.response.data)
      }
  }
)

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (name, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/update-profile", name, {
        withCredentials: true,
      });
      return data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const updateSellerProfile = createAsyncThunk(
  'auth/updateSellerProfile',
  async (name, { rejectWithValue}) => {
      try {
          const { data } = await api.post('/updateSellerProfile', name, { withCredentials: true })
          return data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "An error occurred");
      }
  }
)

export const updateSellerShopProfile = createAsyncThunk(
  'auth/updateSellerShopProfile',
  async (name, { rejectWithValue}) => {
      try {
          const { data } = await api.post('/updateSellerShopProfile', name, { withCredentials: true })
          return data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "An error occurred");
      }
  }
)

export const delete_seller = createAsyncThunk(
  'auth/delete_seller',
  async (sellerId, { rejectWithValue}) => {
      try {
          const { data } = await api.delete(`/seller/delete/${sellerId}`, { withCredentials: true });
          return data;
      } catch (error) {
          console.log(error.message);
          return rejectWithValue(error.response?.data || "An error occurred");
      }
  }
);

export const sellerUpdatePassword = createAsyncThunk(
  'auth/sellerUpdatePassword',
  async (information, { rejectWithValue }) => {
      try {
          const { data } = await api.post('/sellerUpdatePassword', information, { withCredentials: true })
          return data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "An error occurred");
      }
  }
)

export const adminUpdatePassword = createAsyncThunk(
  'auth/adminUpdatePassword',
  async (information, { rejectWithValue }) => {
      try {
          const { data } = await api.post('/adminUpdatePassword', information, { withCredentials: true })
          return data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "An error occurred");
      }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async ({ navigate, role }, { rejectWithValue, fulfillWithValue }) => {
      try {
          const { data } = await api.get('/logout', { withCredentials: true })
          localStorage.removeItem('accessToken')
          if (role === 'admin') {
              navigate('/admin/login')
          } else {
              navigate('/login')
          }

          return fulfillWithValue(data)
      } catch (error) {
          return rejectWithValue(error.response.data)
      }
  }
)


export const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInformaion: '',
    role: returnRole(localStorage.getItem("accessToken")),
    token: localStorage.getItem("accessToken")
  },

  reducers: {
    messageClear: (state, action) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(admin_login.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(admin_login.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    });
    builder.addCase(admin_login.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.token = payload.token;
      state.role = returnRole(payload.token);
    });

    builder.addCase(seller_login.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(seller_login.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    });
    builder.addCase(seller_login.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.token = payload.token;
      state.role = returnRole(payload.token);
    });

    builder.addCase(seller_register.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(seller_register.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    });
    builder.addCase(seller_register.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.token = payload.token;
      state.role = returnRole(payload.token);
    });
    builder.addCase(get_user_information.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.userInformaion = payload.userInformaion;
    });

    builder.addCase(profile_image_upload.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(profile_image_upload.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.userInformaion.image = payload.userInformation.image; 
  });
    builder.addCase(profile_information_add.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(profile_information_add.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.userInformaion = payload.userInformaion;
      state.successMessage = payload.message;
    });

    builder.addCase(admin_profile_image_upload.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(admin_profile_image_upload.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.userInformaion.image = payload.userInformation.image; 
    });

    builder.addCase(updateProfile.pending, (state) => {
      state.loader = true;
    });
    
    builder.addCase(updateProfile.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload?.error || 'An error occurred';
    });
    
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loader = false;
      state.Informaion = action.payload.admin;
      state.message = action.payload.message;
    });

    builder.addCase(updateSellerProfile.pending, (state) => {
      state.loader = true;
    });
        
    builder.addCase(updateSellerProfile.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload?.error || 'An error occurred';
    });
        
    builder.addCase(updateSellerProfile.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.information = payload.seller; 
      state.successMessage = payload.message;
    });

    builder.addCase(updateSellerShopProfile.pending, (state) => {
      state.loader = true;
    });
      
    builder.addCase(updateSellerShopProfile.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload?.error || 'An error occurred';
    });
      
    builder.addCase(updateSellerShopProfile.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.shopInformation = payload.seller; 
      state.successMessage = payload.message;
    });

    builder.addCase(delete_seller.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
    });


    builder.addCase(sellerUpdatePassword.pending, (state) => {
      state.loader = true;
    });
          
    builder.addCase(sellerUpdatePassword.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload?.error || 'An error occurred';
    });
          
    builder.addCase(sellerUpdatePassword.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.information = payload.new_password; 
      state.successMessage = payload.message;
    });

    builder.addCase(adminUpdatePassword.pending, (state) => {
      state.loader = true;
    });
        
    builder.addCase(adminUpdatePassword.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload?.error || 'An error occurred';
    });
        
    builder.addCase(adminUpdatePassword.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.information = payload.new_password; 
      state.successMessage = payload.message;
    });
   
  },
});

export const { messageClear } = authReducer.actions;
export default authReducer.reducer;
