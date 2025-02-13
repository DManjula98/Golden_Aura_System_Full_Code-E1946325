import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_to_cart = createAsyncThunk(
  "cart/add_to_cart",
  async (information, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/home/product/add-to-cart", information);
      // console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_cart_products = createAsyncThunk(
  "cart/get_cart_products",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/product/get-cart-product/${userId}`
      );
      //console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const delete_cart_product = createAsyncThunk(
  "cart/delete_cart_product",
  async (cart_id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/product/delete-cart-product/${cart_id}`
      );
      //console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const quantity_increment = createAsyncThunk(
  "cart/quantity_increment",
  async (cart_id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/home/product/quantity-increment/${cart_id}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const quantity_decrement = createAsyncThunk(
  "cart/quantity_decrement",
  async (cart_id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/home/product/quantity-decrement/${cart_id}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const add_to_wishlist = createAsyncThunk(
  "wishlist/add_to_wishlist",
  async (information, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        "/home/product/add-to-wishlist",
        information
      );
      //console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_wishlist_products = createAsyncThunk(
  "wishlist/get_wishlist_products",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/product/get-wishlist-products/${userId}`
      );
      //console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const remove_wishlist = createAsyncThunk(
  "wishlist/remove_wishlist",
  async (wishlistId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/product/delete-wishlist-product/${wishlistId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cartReducer = createSlice({
  name: "cart",
  initialState: {
    cart_products: [],
    cart_products_count: 0,
    wishlist: [],
    wish_count: localStorage.getItem("wish_count") ? parseInt(localStorage.getItem("wish_count")) : 0,
    price: 0,
    errorMessage: "",
    successMessage: "",
    delivery_fee: 0,
    outofstock_products: [],
    buy_product_item: 0,
  },

  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    reset_count: (state, _) => {
      state.cart_products_count = 0;
      state.wish_count = 0;
    },
    reset_wishlist_count: (state) => {
      state.wish_count = 0;
      localStorage.removeItem("wish_count");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(add_to_cart.rejected, (state, { payload }) => {
      state.errorMessage = payload.error;
    });
    builder.addCase(add_to_cart.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
      state.cart_products_count = state.cart_products_count + 1;
    });
    builder.addCase(get_cart_products.fulfilled, (state, { payload }) => {
      state.cart_products = payload.cart_products;
      state.price = payload.price;
      state.cart_products_count = payload.cart_products_count;
      state.delivery_fee = payload.delivery_fee;
      state.outofstock_products = payload.outofstock_products;
      state.buy_product_item = payload.buy_product_item;
    });
    builder.addCase(delete_cart_product.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
    });
    builder.addCase(quantity_increment.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
    });
    builder.addCase(quantity_decrement.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
    });

    builder.addCase(add_to_wishlist.rejected, (state, { payload }) => {
      state.errorMessage = payload.error;
    });

  builder.addCase(add_to_wishlist.fulfilled, (state, { payload }) => {
    state.successMessage = payload.message;
    state.wish_count = state.wish_count > 0 ? state.wish_count + 1 : 1;
    localStorage.setItem("wish_count", state.wish_count);
});

builder.addCase(get_wishlist_products.fulfilled, (state, { payload }) => {
    state.wishlist = payload.wishlist;  
    state.wish_count = payload.wishlistCount;  
    localStorage.setItem("wish_count", state.wish_count);
});

builder.addCase(remove_wishlist.fulfilled, (state, { payload }) => {
    state.successMessage = payload.message;
    state.wishlist = state.wishlist.filter(
        (product) => product._id !== payload.wishlistId
    );
    state.wish_count = Math.max(state.wish_count - 1, 0);
    localStorage.setItem("wish_count", state.wish_count);
});
  },
});

export const { messageClear, reset_count, reset_wishlist_count } = cartReducer.actions;
export default cartReducer.reducer;
