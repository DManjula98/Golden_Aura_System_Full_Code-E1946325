import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const categoryAdd = createAsyncThunk(
  "category/categoryAdd",
  async ({ name, image,subcategories  }, { rejectWithValue, fulfillWithValue }) => {
      try {
          const formData = new FormData();
          formData.append('name', name);
          formData.append('image', image);
          if (subcategories) {
            formData.append('subcategories', JSON.stringify(subcategories));
        }
          const { data } = await api.post("/category-add", formData, {
              withCredentials: true,
          });
          
          return fulfillWithValue(data);
      } catch (error) {
          return rejectWithValue({ error: error.response });
      }
  }
);

export const get_category = createAsyncThunk(
  "category/get_category",
  async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
      try {
          
          const { data } = await api.get(`/category-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, {
              withCredentials: true,
          });
    
          return fulfillWithValue(data);
      } catch (error) {
          return rejectWithValue({ error: error.response });
      }
  }
);

export const get_category_by_Id = createAsyncThunk(
  "category/get_category_by_Id",
  async (categoryId, { rejectWithValue, fulfillWithValue }) => {
      try {
          
          const { data } = await api.get(`/category-get-by-id/${categoryId}`, {
              withCredentials: true,
          });
    
          return fulfillWithValue(data);
      } catch (error) {
          return rejectWithValue({ error: error.response });
      }
  }
);

export const category_image_update = createAsyncThunk(
  'category/category_image_update',
  async ({ oldImage, newImage, categoryId }, { rejectWithValue, fulfillWithValue }) => {
      try {
          const formData = new FormData();
          formData.append('oldImage', oldImage);
          formData.append('newImage', newImage);
          formData.append('categoryId', categoryId);
          const { data } = await api.post('/category-image-update', formData, { withCredentials: true });
          return fulfillWithValue(data);
      } catch (error) {
          return rejectWithValue(error.response.data);
      }
  }
);

export const delete_category = createAsyncThunk(
  'category/delete_category',
  async (category_id, { rejectWithValue, fulfillWithValue }) => {
      try {
          const { data } = await api.delete(`/category/delete/${category_id}`);
          return fulfillWithValue(data);
      } catch (error) {
          console.log(error.message);
          return rejectWithValue(error.response.data);
      }
  }
);

export const update_category = createAsyncThunk(
  'category/update_category',
  async (category, { rejectWithValue, fulfillWithValue }) => {
      try {
          const { data } = await api.post('/category-update/', category, { withCredentials: true })
          return fulfillWithValue(data)
      } catch (error) {
          return rejectWithValue(error.response.data)
      }
  }
)

export const categoryReducer = createSlice({
  name: "category",
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    categories: [],
    totalCategory: 0
  },

  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(categoryAdd.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(categoryAdd.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error.data.message; 
    });
    builder.addCase(categoryAdd.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.categories = [...state.categories, payload.category]
    });
    builder.addCase(get_category.fulfilled, (state, { payload }) => {
      state.totalCategory = payload.totalCategory
      state.categories = payload.categories
    });
    builder.addCase(get_category_by_Id.fulfilled, (state, { payload }) => {
          state.category = payload.category;
        });
    builder.addCase(delete_category.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
  });

   builder.addCase(update_category.pending, (state) => {
        state.loader = true;
      });
  
      builder.addCase(update_category.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload?.error || 'An error occurred';
      });
  
      builder.addCase(update_category.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.category = payload.category;
        state.successMessage = payload.message;
      });

          builder.addCase(category_image_update.fulfilled, (state, { payload }) => {
            state.category = payload.category;
            state.successMessage = payload.message;
        });
  },
});

export const { messageClear } = categoryReducer.actions
export default categoryReducer.reducer
