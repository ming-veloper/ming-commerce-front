import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CartProduct } from './cart.types'
import { addCart, deleteCart, getAllCartList } from '../../api/cart.api'

export const fetchAllCartList: AsyncThunk<
  Array<CartProduct>,
  any,
  any
> = createAsyncThunk('cartSlice/getAllCartList', async (arg, thunkAPI) => {
  const response = await getAllCartList()
  return response.data.result
})

export const addCartAction: AsyncThunk<
  { cartLineCount: number },
  {
    productId: string
    quantity: number
  },
  any
> = createAsyncThunk('cartSlice/addCart', async (arg, thunkAPI) => {
  const response = await addCart(arg)
  return response.data
})

export const deleteCartAction: AsyncThunk<
  { cartLineCount: number },
  { productId: string },
  any
> = createAsyncThunk('cartSlice/deleteCart', async (arg, thunkAPI) => {
  const response = await deleteCart(arg)
  return response.data
})

const initialState: {
  count: number
  list: {
    cartProductList: Array<CartProduct>
    loading: boolean
  }
  add: {
    success: boolean
  }
} = {
  count: 0,
  list: {
    cartProductList: [],
    loading: true,
  },
  add: {
    success: false,
  },
}

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    initSuccess: (state) => {
      state.add.success = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCartList.pending, (state) => {
      state.list.loading = true
    })

    builder.addCase(fetchAllCartList.rejected, (state) => {
      state.list.loading = false
    })

    builder.addCase(fetchAllCartList.fulfilled, (state, action) => {
      state.list.cartProductList = action.payload
      state.count = action.payload.length
    })

    builder.addCase(addCartAction.pending, (state) => {
      state.add.success = false
    })

    builder.addCase(addCartAction.rejected, (state) => {
      state.add.success = false
    })

    builder.addCase(addCartAction.fulfilled, (state, action) => {
      state.add.success = true
      state.count = action.payload.cartLineCount
    })

    builder.addCase(deleteCartAction.fulfilled, (state, action) => {
      state.count = action.payload.cartLineCount
    })
  },
})

export default cartSlice.reducer

export const { initSuccess } = cartSlice.actions
