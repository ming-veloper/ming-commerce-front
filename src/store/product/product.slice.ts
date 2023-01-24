import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as productApi from '../../api/product.api'
import { Product, ProductCategory } from './product.types'

export const fetchProductList: AsyncThunk<
  Array<Product>,
  { category: ProductCategory; page: number },
  any
> = createAsyncThunk('productSlice/fetchProduct', async (arg, thunkAPI) => {
  const { page, category } = arg
  const response = await productApi.getProductList(category, page)
  return response.data.result
})

const initialState: {
  productList: Array<Product>
  loading: boolean
} = {
  productList: [],
  loading: true,
}

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchProductList.pending, (state, action) => {
      // pending 중에는 loading true
      state.loading = true
      console.log('상품 불러오는 중')
    })

    builder.addCase(fetchProductList.rejected, (state, action) => {
      state.loading = false
      console.error('상품 불러오기 실패')
    })

    builder.addCase(fetchProductList.fulfilled, (state, action) => {
      state.loading = false
      state.productList = action.payload
      console.log('상품 불러오기 완료')
    })
  },
})

export default productSlice.reducer
