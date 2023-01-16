import { configureStore } from '@reduxjs/toolkit'
import registerReducer from './register/register.slice'

export const store = configureStore({
  reducer: {
    register: registerReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
