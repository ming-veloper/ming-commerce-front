import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as productApi from '../../api/product.api'
import { Product, ProductCategory, ProductDetail } from './product.types'

export const fetchProductList: AsyncThunk<
  Array<Product>,
  { category: ProductCategory; page: number },
  any
> = createAsyncThunk('productSlice/fetchProduct', async (arg, thunkAPI) => {
  const { page, category } = arg
  const response = await productApi.getProductList(category, page)
  return response.data.result
})

export const fetchProductDetail: AsyncThunk<ProductDetail, string, any> =
  createAsyncThunk('productSlice/fetchProductDetail', async (arg, thunkAPI) => {
    const response = await productApi.getProductDetail(arg)
    return response.data.result
  })

const initialState: {
  list: {
    productList: Array<Product>
    loading: boolean
  }
  detail: {
    productDetail: ProductDetail | null
    loading: boolean
  }
} = {
  list: {
    productList: [],
    loading: true,
  },
  detail: {
    productDetail: null,
    loading: true,
  },
}

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    initDetail: (state, action) => {
      state.detail.productDetail = null
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProductList.pending, (state, action) => {
      // pending 중에는 loading true
      state.list.loading = true
      console.log('상품 불러오는 중')
    })

    builder.addCase(fetchProductList.rejected, (state, action) => {
      state.list.loading = false
      console.error('상품 불러오기 실패')
    })

    builder.addCase(fetchProductList.fulfilled, (state, action) => {
      state.list.loading = false
      state.list.productList = action.payload
      console.log('상품 불러오기 완료')
    })

    builder.addCase(fetchProductDetail.pending, (state, action) => {
      state.detail.loading = true
      console.log('상품 상세 불러오는 중')
    })

    builder.addCase(fetchProductDetail.rejected, (state, action) => {
      state.detail.loading = false
      console.error('상품 상세 불러오기 실패')
    })

    builder.addCase(fetchProductDetail.fulfilled, (state, action) => {
      state.detail.loading = false
      state.detail.productDetail = action.payload
      console.log('상품 상세 불러오기 완료')
    })
  },
})

export default productSlice.reducer
export const { initDetail } = productSlice.actions
