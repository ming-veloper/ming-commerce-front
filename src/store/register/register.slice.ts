import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import {
  EmailCheckResponse,
  RegisterRequest,
  Token,
  RegisterType,
} from './register.types'
import * as registerApi from '../../api/register.api'

const initialState: RegisterType = {
  errorMessage: {
    email: '',
    password: '',
  },
  emailCheck: null,
  registerRequest: {
    email: '',
    password: '',
    passwordConfirm: '',
    memberName: '',
  },
  token: {
    accessToken: '',
    refreshToken: '',
  },
}
type TargetChangeAction = PayloadAction<{
  name: keyof RegisterRequest
  value: string
}>

export const checkEmail: AsyncThunk<EmailCheckResponse, string, any> =
  createAsyncThunk('registerSlice/checkEmail', async (arg) => {
    const response = await registerApi.duplicateEmailCheck(arg)
    return response.data
  })

export const registerUser: AsyncThunk<Token, RegisterRequest, any> =
  createAsyncThunk('registerSlice/register', async (arg, thunkAPI) => {
    const response = await registerApi.register(arg)
    return response.data
  })

const registerSlice = createSlice({
  name: 'registerSlice',
  initialState,
  reducers: {
    set: (state, action: TargetChangeAction) => {
      const { value, name } = action.payload
      state.registerRequest[name] = value
    },
    reset: (state) => {
      state = initialState
    },
  },

  extraReducers: (builder) => {
    builder.addCase(checkEmail.fulfilled, (state, action) => {
      const { isDuplicated } = action.payload
      // 이미 중복 되었으면
      if (isDuplicated) {
        state.emailCheck = false
        state.errorMessage.email = `${state.registerRequest.email}은 이미 사용중인 이메일입니다.`
      } else {
        state.emailCheck = true
        state.errorMessage.email = ''
      }
    })
    builder.addCase(checkEmail.rejected, (state) => {
      state.errorMessage.email = '일시적인 서버 오류가 발생하였습니다.'
      state.emailCheck = false
    })

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.token = action.payload
      localStorage.setItem('token', JSON.stringify(action.payload))
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      console.log('회원가입 실패')
      console.log(state, action)
    })
  },
})

export default registerSlice.reducer

export const { set, reset } = registerSlice.actions
