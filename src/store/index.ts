import { configureStore } from '@reduxjs/toolkit'
import registerReducer from './register/register.slice'
import authReducer from './auth/auth.slice'
import productReducer from './product/product.slice'
export const store = configureStore({
  reducer: {
    register: registerReducer,
    auth: authReducer,
    product: productReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
