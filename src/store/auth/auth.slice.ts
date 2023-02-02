import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { MemberInfo } from './auth.types'
import { memberInfo } from '../../api/auth.api'

const initialState: { memberInfo: MemberInfo | null } = {
  memberInfo: null,
}
export const getMemberInfo: AsyncThunk<MemberInfo, any, any> = createAsyncThunk(
  'registerSlice/memberInfo',
  async () => {
    const response = await memberInfo()
    return response.data.result
  },
)

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setTempMemberInfo: (state, action: PayloadAction<MemberInfo>) => {
      state.memberInfo = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMemberInfo.fulfilled, (state, action) => {
      state.memberInfo = action.payload
      localStorage.setItem('memberInfo', JSON.stringify(action.payload))
    })

    builder.addCase(getMemberInfo.rejected, (state, action) => {
      try {
        localStorage.removeItem('token')
        localStorage.removeItem('memberInfo')
      } catch {
        console.log('에러 발생')
      }
    })
  },
})

export default authSlice.reducer

export const { setTempMemberInfo } = authSlice.actions
