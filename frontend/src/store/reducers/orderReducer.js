import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_admin_orders = createAsyncThunk(
  'order/get_admin_orders',
  async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
      try {
        const { data } = await api.get(`/admin/orders?page=${page}&searchValue=${searchValue}&parPage=${parPage}`, { withCredentials: true })     
        console.log(data)
          return fulfillWithValue(data)

      } catch (error) {
          return rejectWithValue(error.response.data)
      }
  }
)


export const get_admin_order = createAsyncThunk(
        'order/get_admin_order',
        async (orderId, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await api.get(`/admin/order/${orderId}`, { withCredentials: true })
                return fulfillWithValue(data)
            } catch (error) {
                return rejectWithValue(error.response.data)
            }
        }
    )


    export const admin_order_status_update = createAsyncThunk(
        'order/admin_order_status_update',
        async ({ orderId, information }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await api.put(`/admin/order-status/update/${orderId}`, information, { withCredentials: true })
                return fulfillWithValue(data)
            } catch (error) {
                return rejectWithValue(error.response.data)
            }
        }
    )
    

export const get_seller_orders = createAsyncThunk(
    'order/get_seller_orders',
    async ({ parPage, page, searchValue, sellerId }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/seller/orders/${sellerId}?page=${page}&searchValue=${searchValue}&parPage=${parPage}`, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const get_seller_order = createAsyncThunk(
    'order/get_seller_order',
    async (orderId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/seller/order/${orderId}`, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const seller_order_status_update = createAsyncThunk(
    'order/seller_order_status_update',
    async ({ orderId, information }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/seller/order-status/update/${orderId}`, information, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const orderReducer = createSlice({
  name: 'order',
  initialState: {
      successMessage: '',
      errorMessage: '',
      totalOrder: 0,
      order: {},
      myOrders:[],
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_admin_orders.fulfilled, (state, { payload }) => {
        state.myOrders = payload.orders
        state.totalOrder = payload.totalOrder
    });

    builder.addCase(get_admin_order.fulfilled, (state, { payload }) => {
        state.order = payload.order
    });

    builder.addCase(admin_order_status_update.rejected, (state, { payload }) => {
        state.errorMessage = payload.message
    });

    builder.addCase(admin_order_status_update.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message
    });

    builder.addCase(get_seller_orders.fulfilled, (state, { payload }) => {
        state.myOrders = payload.orders
        state.totalOrder = payload.totalOrder
    });

    builder.addCase(get_seller_order.fulfilled, (state, { payload }) => {
        state.order = payload.order
    });

    builder.addCase(seller_order_status_update.rejected, (state, { payload }) => {
       state.errorMessage = payload.message
    });

    builder.addCase(seller_order_status_update.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message
    });
  },
  
});



export const { messageClear } = orderReducer.actions
export default orderReducer.reducer
