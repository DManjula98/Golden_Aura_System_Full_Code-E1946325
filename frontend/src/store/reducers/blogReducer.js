import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_blog = createAsyncThunk(
    'blog/add_blog',
    async ({ blog }, { rejectWithValue, fulfillWithValue }) => {
      try {
        const { data } = await api.post('/blog-add', blog, { withCredentials: true });
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const update_blog = createAsyncThunk(
    'blog/updateblog',
    async (blog, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/blog-update', blog, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
  )
  
  export const blog_image_update = createAsyncThunk(
    'blog/blog_image_update',
    async ({ oldImage, newImage, blogId }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('oldImage', oldImage);
            formData.append('newImage', newImage);
            formData.append('blogId', blogId);
            const { data } = await api.post('/blog-image-update', formData, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
  );
  
  export const get_blogs = createAsyncThunk(
    'blog/get_blogs',
    async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/blogs-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
  )
  
  export const get_blog = createAsyncThunk(
    'blog/get_blog',
    async (blogId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/blog-get/${blogId}`, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
  )
  
  
  export const delete_blog = createAsyncThunk(
    'blog/delete_blog',
    async (blogId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.delete(`/blog/delete/${blogId}`);
            return fulfillWithValue(data);
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.response.data);
        }
    }
  );

export const blogReducer = createSlice({
    name: 'blog',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        blogs: [],
        blog: '',
        totalblog: 0
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder.addCase(add_blog.pending, (state) => {
          state.loader = true;
        });
    
        builder.addCase(add_blog.rejected, (state, { payload }) => {
          state.loader = false;
          state.errorMessage = payload?.error || 'An error occurred';
        });
    
        builder.addCase(add_blog.fulfilled, (state, { payload }) => {
          state.loader = false;
          state.successMessage = payload.message;
        });
    
        builder.addCase(get_blogs.fulfilled, (state, { payload }) => {
          state.totalblog = payload.totalblog; 
          state.blogs = payload.blogs; 
        });
    
        builder.addCase(get_blog.fulfilled, (state, { payload }) => {
          state.blog = payload.blog;
        });
    
        builder.addCase(update_blog.pending, (state) => {
          state.loader = true;
        });
    
        builder.addCase(update_blog.rejected, (state, { payload }) => {
          state.loader = false;
          state.errorMessage = payload?.error || 'An error occurred';
        });
    
        builder.addCase(update_blog.fulfilled, (state, { payload }) => {
          state.loader = false;
          state.blog = payload.blog;
          state.successMessage = payload.message;
        });
    
        builder.addCase(blog_image_update.fulfilled, (state, { payload }) => {
          state.blog = payload.blog;
          state.successMessage = payload.message;
      });
      
      builder.addCase(delete_blog.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
    });
    
    
      }
    });
    
    export const { messageClear } = blogReducer.actions;
    export default blogReducer.reducer;
    