import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";


export const customer_register = createAsyncThunk(
  "auth/customer_register",
  async (information, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer/customer-register",
        information
      );
      localStorage.setItem("customerToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const customer_login = createAsyncThunk(
  "auth/customer_login",
  async (information, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer/customer-login", information);
      localStorage.setItem("customerToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const customer_profile_image_upload = createAsyncThunk(
  'auth/customer_profile_image_upload',
  async (image, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.post('/customer-profile-image-upload', image, { withCredentials: true })
        return fulfillWithValue(data)
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
}
)

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (updatedData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/updateProfile', updatedData, { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const delete_customer = createAsyncThunk(
  'auth/delete_customer',
  async (customerId, { rejectWithValue}) => {
      try {
          const { data } = await api.delete(`/customer/delete/${customerId}`, { withCredentials: true });
          return data;
      } catch (error) {
          console.log(error.message);
          return rejectWithValue(error.response?.data || "An error occurred");
      }
  }
);

export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async (information, { rejectWithValue, fulfillWithValue }) => {
      try {
          const { data } = await api.post('/updatePassword', information, { withCredentials: true })
          return fulfillWithValue(data)
      } catch (error) {
          return rejectWithValue(error.response.data)
      }
  }
)

export const requestPasswordReset = createAsyncThunk(
  'auth/requestPasswordReset',
  async (information, { rejectWithValue }) => {
      console.log('API call triggered with:', information);
      try {
          const { data } = await api.post('/forgotPassword', information);
          return data.message;
      } catch (error) {
          console.error('Error in API:', error);
          return rejectWithValue(error.response?.data?.error || 'Something went wrong');
      }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (information, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/resetPassword', information, { withCredentials: true });
      return fulfillWithValue(data.message); 
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to reset password');
    }
  }
);

const decodeToken = (token) => {
  if (token) {
    const userInformation = jwtDecode(token);
    return userInformation;
  } else {
    return "";
  }
};

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    loader: false,
    userInformation: decodeToken(localStorage.getItem("customerToken"))|| null,
    errorMessage: "",
    successMessage: "",
  },

  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    user_reset: (state, _) => {
      state.userInformation = null; 
    },
  },
  extraReducers: (builder) => {
    builder.addCase(customer_register.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(customer_register.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    });
    builder.addCase(customer_register.fulfilled, (state, { payload }) => {
      const userInformation = decodeToken(payload.token);
      state.successMessage = payload.message;
      state.loader = false;
      state.userInformation = userInformation;
      
    });
    builder.addCase(customer_login.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(customer_login.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    });
    builder.addCase(customer_login.fulfilled, (state, { payload }) => {
      const userInformation = decodeToken(payload.token);
      state.successMessage = payload.message;
      state.loader = false;
      state.userInformation = userInformation;
    });

    builder.addCase(customer_profile_image_upload.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(customer_profile_image_upload.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.userInformation.image = payload.customer?.image; 
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
      state.Information = action.payload.customer;
      state.successMessage = action.payload.message;
    });

    builder.addCase(delete_customer.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
    });

    builder.addCase(updatePassword.pending, (state) => {
      state.loader = true;
    });
  
   builder.addCase(updatePassword.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload?.error || 'An error occurred';
   });
  
  builder.addCase(updatePassword.fulfilled, (state, { payload }) => {
    state.loader = false;
    state.information = payload.new_password; 
    state.successMessage = payload.message;
  });

  builder.addCase(requestPasswordReset.pending, (state) => {
    state.loading = true;
    state.error = null;
    state.message = null;
  })
  
  builder.addCase(requestPasswordReset.fulfilled, (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
  })

  builder.addCase(requestPasswordReset.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })

  builder.addCase(resetPassword.pending, (state) => {
    state.loading = true;
    state.error = null;
    state.message = null;
  })
  builder.addCase(resetPassword.fulfilled, (state, action) => {
    console.log("Password reset successful"); 
    state.successMessage = action.payload;
    state.loader = false;
      
  })
  builder.addCase(resetPassword.rejected, (state, action) => {
    console.error("Password reset failed:", action.payload); 
    state.errorMessage = action.payload;
    state.loader = false;
  });
  },
});

export const { messageClear, user_reset,setUserInformation } = authReducer.actions;
export default authReducer.reducer;
