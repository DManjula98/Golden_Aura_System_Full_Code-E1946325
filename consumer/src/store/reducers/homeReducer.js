import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';
import axios from 'axios'; 

export const get_category = createAsyncThunk(
    'product/get_category',
    async (_, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await api.get('/home/get-categories');
            return fulfillWithValue(data);
        } catch (error) {
            console.log(error.response);
            return rejectWithValue(error.response);
        }
    }
);

export const get_products = createAsyncThunk(
    'product/get_products',
    async (_, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await api.get('/home/get-products');
            return fulfillWithValue(data);
        } catch (error) {
            console.log(error.response);
            return rejectWithValue(error.response);
        }
    }
);

export const get_blogs = createAsyncThunk(
    'blog/get_blogs',
    async (_, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await api.get('/home/get-blogs');
            return fulfillWithValue(data);
        } catch (error) {
            console.log(error.response);
            return rejectWithValue(error.response);
        }
    }
);

export const price_range_product = createAsyncThunk(
    'product/price_range_product',
    async (_, {fulfillWithValue }) => {
        try {
            const { data} = await api.get('/home/price-range-latest-product')
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const query_products = createAsyncThunk(
    'product/query_products',
    async (query, { fulfillWithValue }) => {
        try {
            console.log('Query being sent to backend:', query); 
            const { data } = await api.get(`/home/query-products?category=${query.Category}&subcategory=${query.Subcategory}&brand=${query.Brand}&categoryType=${query.categoryType}&rating=${query.rating}&lowPrice=${query.low}&highPrice=${query.high}&sortPrice=${query.sortPrice}&pageNumber=${query.pageNumber}&searchValue=${query.searchValue ? query.searchValue : ''}`);
            return fulfillWithValue(data);
        } catch (error) {
            console.log('Error fetching products:', error.response);
        }
    }
);

//Product Details Page
export const get_product = createAsyncThunk(
    'product/get_product',
    async (slug, {fulfillWithValue}) => {
        try {
            const {data} = await api.get(`/home/get-product/${slug}`)
            //console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const get_blog = createAsyncThunk(
    'blog/get_blog',
    async (title, {fulfillWithValue}) => {
        try {
            const {data} = await api.get(`/home/get-blog/${title}`)
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const get_banners = createAsyncThunk(
    'product/get_banners',
    async (_, {
        fulfillWithValue
    }) => {
        try {
            const {
                data
            } = await api.get('/banners')
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)


export const customer_review = createAsyncThunk(
    'review/customer_review',
    async (information, {fulfillWithValue}) => {
        try {
            const {data} = await api.post('/home/customer/submit-review', information)
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {

        }
    }
)

export const get_reviews = createAsyncThunk(
    'review/get_reviews',
    async ({productId,pageNumber}, {fulfillWithValue}) => {
        try {
            const {data} = await api.get(`/home/customer/get-reviews/${productId}?pageNo=${pageNumber}`)
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {

        }
    }
)


export const homeReducer = createSlice({
    name: 'home',
    initialState: {
        categories: [],
        subcategories: [],
        products: [],
        totalProduct: 0,
        parPage: 6,
        latest_product: [],
        topRated_product: [],
        discount_product: [],
        priceRang: {
            low: 0,
            high: 20000
        },
        product: {},
        relatedProducts: [],
        moreProducts: [],
        successMessage: '',
        errorMessage: '',
        totalReview: 0,
        rating_review: [],
        reviews: [],
        banners: [],
        blogs:[],
        totalBlog: 0,
        blog:{},
        brands:[]
      
    }
    ,
    reducers: {
        messageClear: (state, _) => {
            state.successMessage = ""
            state.errorMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder.addCase(get_category.fulfilled, (state, {payload}) => {
            state.categories = payload.categories;
            state.subcategories = payload.subcategories || [];
        })
        builder.addCase(get_products.fulfilled, (state, {payload}) => {
            state.products = payload.products || [];
            state.latest_product = payload.latest_product || [];
            state.topRated_product = payload.topRated_product || [];
            state.discount_product = payload.discount_product || [];
        })
        builder.addCase(get_blogs.fulfilled, (state, {payload}) => {
            state.blogs = payload.blogs || [];
        })
        builder.addCase(price_range_product.fulfilled, (state, {payload}) => {
            state.latest_product = payload.latest_product || [];
            state.priceRang = payload.priceRang || state.priceRang;
        })
        builder.addCase(query_products.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(query_products.fulfilled, (state, { payload }) => {
            state.products = payload?.products || [];
            state.totalProduct = payload?.totalProduct || 0;
            state.parPage = payload?.parPage || state.parPage;
            state.loader = false;
        });
        builder.addCase(query_products.rejected, (state, { payload }) => {
            state.errorMessage = payload?.error || 'An error occurred while fetching products.';
            state.loader = false;
        });  
        builder.addCase(get_product.fulfilled, (state, {payload}) => {
            state.product = payload.product || [];
            state.relatedProducts = payload.relatedProducts || [];
            state.moreProducts = payload.moreProducts || [];  
        })
        builder.addCase(get_blog.fulfilled, (state, {payload}) => {
            state.blog = payload.blog || [];
        })
        builder.addCase(customer_review.fulfilled, (state, { payload }) => {
            state.successMessage = payload.message
        });  
        builder.addCase(get_reviews.fulfilled, (state, { payload }) => {
            state.reviews = payload.reviews
            state.totalReview = payload.totalReview
            state.rating_review = payload.rating_review
        });  
        builder.addCase(get_banners.fulfilled, (state, { payload }) => {
            state.banners = payload.banners
        });  
    }
});

export const {messageClear} = homeReducer.actions
export default homeReducer.reducer;
