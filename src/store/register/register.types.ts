export type RegisterRequest = {
  email: string
  password: string
  passwordConfirm: string
  memberName: string
}
export type RegisterType = {
  /**
   * 이메일 중복 확인 여부
   */
  emailCheck: boolean | null
  registerRequest: RegisterRequest
  errorMessage: {
    /**
     * 이메일 에러 메시지
     */
    email: string

    /**
     * 패스워드 에러 메시지
     */
    password: string

    /**
     * 비밀번호 확인 에러 메시지
     */
    passwordConfirm: string
  }
  token: Token | null
}
export type EmailCheckResponse = {
  isDuplicated: boolean
}
export type Token = {
  accessToken: string
  refreshToken: string
}

export const passwordCondition = /^[A-Za-z0-9(?=.*\d)[$@!%&]{8,16}$/g
