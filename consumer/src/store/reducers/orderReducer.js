import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const place_order = createAsyncThunk(
  "order/place_order",
  async ({price,products,delivery_fee,deliverInformation,userId,navigate,items,}) => {
    try {
      const { data } = await api.post("home/order/place-order", {
        price,
        products,
        delivery_fee,
        deliverInformation,
        userId,
        navigate,
        items,
      });
      navigate("/payment", {
        state: {
          price: price + delivery_fee,
          items,
          orderId: data.orderId,
        },
      });
      //console.log(data);
      return true;
    } catch (error) {
      console.log(error.response);
    }
  }
);

// To get order to dashboard
export const get_orders = createAsyncThunk(
  "order/get_orders",
  async ({ customerId, status }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/customer/get-orders/${customerId}/${status}`);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const get_order = createAsyncThunk(
  "order/get_order",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/customer/get-order/${orderId}`);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const orderReducer = createSlice({
  name: "order",
  initialState: {
    myOrders: [],
    errorMessage: "",
    successMessage: "",
    myOrder: {},
  },

  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_orders.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
      state.myOrders = payload.orders; 
    });
    builder.addCase(get_order.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
      state.myOrder = payload.order; 
    });
  },
});

export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
