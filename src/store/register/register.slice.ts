import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import {
  EmailCheckResponse,
  passwordCondition,
  RegisterRequest,
  RegisterType,
  Token,
} from './register.types'
import * as registerApi from '../../api/register.api'

const initialState: RegisterType = {
  errorMessage: {
    email: '',
    password: '',
    passwordConfirm: '',
  },
  emailCheck: null,
  registerRequest: {
    email: '',
    password: '',
    passwordConfirm: '',
    memberName: '',
  },
  token: null,
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

export const registerMember: AsyncThunk<Token, RegisterRequest, any> =
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
      switch (name) {
        case 'password':
          state.errorMessage.password = passwordCondition.test(value)
            ? ''
            : '비밀번호를 8자 이상 16자 이하로 설정해주세요.'
          break
        case 'passwordConfirm':
          state.errorMessage.passwordConfirm =
            value === state.registerRequest.password
              ? ''
              : '비밀번호와 똑같이 설정해주세요.'
          break
      }
    },
    reset: (state) => {
      state.registerRequest = initialState.registerRequest
      state.emailCheck = false
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

    builder.addCase(registerMember.fulfilled, (state, action) => {
      state.token = action.payload
      localStorage.setItem('token', JSON.stringify(action.payload))
    })

    builder.addCase(registerMember.rejected, (state, action) => {
      console.log('회원가입 실패')
      console.log(state, action)
    })
  },
})

export default registerSlice.reducer

export const { set, reset } = registerSlice.actions
