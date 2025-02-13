import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const addProductCategory = createAsyncThunk(
  "productCategory/addProductCategory",
  async ({ name, subcategories }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/product-category/add", { name, subcategories }, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue({ error: error.response });
    }
  }
);

export const getProductCategories = createAsyncThunk(
  "productCategory/getProductCategories",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/product-category/get", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue({ error: error.response });
    }
  }
);

const productCategorySlice = createSlice({
  name: "productCategory",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    productCategories: [],
  },
  
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addProductCategory.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(addProductCategory.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.productCategories = [...state.productCategories, payload.productCategory];
    });
    builder.addCase(addProductCategory.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error.data.message;
    });

    builder.addCase(getProductCategories.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getProductCategories.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.productCategories = payload.productCategories;
    });
    builder.addCase(getProductCategories.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error.data.message;
    });
  },
});

export const { messageClear } = productCategorySlice.actions;
export default productCategorySlice.reducer;
