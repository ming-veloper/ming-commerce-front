import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CartProduct } from './cart.types'
import { getAllCartList } from '../../api/cart.api'

export const fetchAllCartList: AsyncThunk<
  Array<CartProduct>,
  any,
  any
> = createAsyncThunk('cartSlice/getAllCartList', async (arg, thunkAPI) => {
  const response = await getAllCartList()
  return response.data.result
})

const initialState: {
  list: {
    cartList: Array<CartProduct>
    loading: boolean
  }
} = {
  list: {
    cartList: [],
    loading: true,
  },
}

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCartList.pending, (state) => {
      state.list.loading = true
    })

    builder.addCase(fetchAllCartList.rejected, (state) => {
      state.list.loading = false
    })

    builder.addCase(fetchAllCartList.fulfilled, (state, action) => {
      state.list.cartList = action.payload
    })
  },
})

export default cartSlice.reducer
