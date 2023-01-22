import { Token } from '../store/register/register.types'
import { AxiosResponse } from 'axios'
import { MemberInfo } from '../store/auth/auth.types'
import client from './client'
import { LoginRequest } from '../pages/LoginPage'

const HEADER = 'X-WWW-MING-AUTHORIZATION'
export const memberInfo = (
  token: Token,
): Promise<AxiosResponse<{ result: MemberInfo }>> => {
  return client.get('/api/members/info', {
    headers: {
      [HEADER]: token.accessToken,
    },
  })
}

export const login = (
  loginRequest: LoginRequest,
): Promise<AxiosResponse<Token>> => {
  return client.post('/api/login', loginRequest)
}
