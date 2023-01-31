import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import services from './services/service';

export const getCategory = createAsyncThunk('GET_CATEGORY', async (category, thunkAPI) => {
  try {
    return await services.getCategory(category);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
});

export const searchingGoods = createAsyncThunk('SEARCH_GOOD', async (searchValue, thunkAPI) => {
  try {
    return await services.searchGoods(searchValue);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
});

export const searchingGoodsByArticul = createAsyncThunk('SEARCH_GOOD_BY_ARTICUL', async (articul, thunkAPI) => {
  try {
    return await services.searchGoodsByArticul(articul);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
});

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    catName: '',
    goods: {},
    curPage: 1,
    limit: 3,
    total: null,
    catDescription: [],

    isError: false,
    isLoading: false,
    message: ''
  },
  reducers: {
    removeGood: (state, action) => {
      console.log(action.payload);
      // state.goods = state.goods.filter(item=>item!=action.payload)
      state.goods = Object.keys(state.goods).reduce((acc, item) => {
        console.log(state.goods[item]._id);
        if (state.goods[item]._id != action.payload) acc[item] = state.goods[item]
        return acc
      }, {})
    },
    cleanupCatSlice: (state, action) => {
      state.isLoading = false
      state.catName = ''
      state.goods = {}
      state.total = null
      state.catDescription = []
        state.curPage = 1
        state.message=''
      


    },
    setCurPage: (state, action) => {
      state.curPage = action.payload
    },
    setLimit: (state, action) => {
      state.limit = action.payload
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.goods = {}

        state.message = null;

      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.catName = action.payload.category
        state.goods = { ...action.payload.goods }
        state.total = action.payload.total
        state.curPage = action.payload.curPage
        // state.limit = action.payload.limit
        state.catDescription = [action.payload.catDescription]
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.goods = {};
        state.total = null;
        state.curPage =1

        state.catName = null;
      })

      //? SEARCH BY NAME
      .addCase(searchingGoods.pending, (state, action) => {
        state.isLoading = true;
        state.message = null;
        state.isError = false;
        state.total = null
        state.goods = {}

      })
      .addCase(searchingGoods.fulfilled, (state, action) => {
        state.isLoading = false
        state.goods = { ...action.payload.goods }
        state.total = action.payload.total


      })
      .addCase(searchingGoods.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.message.message;
        state.total = null
        state.goods = {}
      })
      // ? By ARTICUL
      .addCase(searchingGoodsByArticul.pending, (state, action) => {
        state.isLoading = true;
        state.message = null;
        state.isError = false;
        state.total = null
        state.goods = {}

      })
      .addCase(searchingGoodsByArticul.fulfilled, (state, action) => {
        state.isLoading = false
        state.goods = { ...action.payload.goods }
        state.total = action.payload.total


      })
      .addCase(searchingGoodsByArticul.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.message.message;
        state.total = null
        state.goods = {}
      })
  }
})
export const { removeGood, cleanupCatSlice, setCurPage, setLimit } = categorySlice.actions
export default categorySlice.reducer