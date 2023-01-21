import { Token } from '../store/register/register.types'
import { AxiosResponse } from 'axios'
import { MemberInfo } from '../store/auth/auth.types'
import client from './client'

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
