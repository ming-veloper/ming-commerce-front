import { configureStore } from '@reduxjs/toolkit'
import registerReducer from './register/register.slice'
import authReducer from './auth/auth.slice'

export const store = configureStore({
  reducer: {
    register: registerReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
