import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_banner = createAsyncThunk(
    'banner/add_banner',
    async (information, { fulfillWithValue, rejectWithValue }) => {
        try {
            const {data} = await api.post('/banner/add', information, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const update_banner = createAsyncThunk(
    'banner/update_banner',
    async ({ bannerId, information }, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await api.put(`/banner/update/${bannerId}`, information, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_banner = createAsyncThunk(
    'banner/get_banner',
    async (productId, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await api.get(`/banner/get/${productId}`, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const bannerReducer = createSlice({
    name: 'banner',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        banners: [],
        banner: ""
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder.addCase(add_banner.pending, (state, _) => {
          state.loader = true;
        });
        builder.addCase(add_banner.rejected, (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.message
        });
        builder.addCase(add_banner.fulfilled, (state, { payload }) => {
            state.loader = false
            state.successMessage = payload.message
            state.banner = payload.banner
        });
        builder.addCase(get_banner.fulfilled, (state, { payload }) => {
            state.banner = payload.banner
        });
        builder.addCase(update_banner.pending, (state, _) => {
            state.loader = true;
      });
      builder.addCase(update_banner.rejected, (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.message
    });
    builder.addCase(update_banner.fulfilled, (state, { payload }) => {
        state.loader = false
        state.successMessage = payload.message
        state.banner = payload.banner
  });
      },
    });
    
export const { messageClear } = bannerReducer.actions
export default bannerReducer.reducer