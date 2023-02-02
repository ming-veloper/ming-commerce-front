import { Alert, Button, Container, Form } from 'react-bootstrap'
import React, { useEffect, useReducer, useState } from 'react'
import { login } from '../api/auth.api'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getMemberInfo } from '../store/auth/auth.slice'
import { RootState } from '../store'

export interface LoginRequest {
  email: string
  password: string
}

interface LoginAction {
  type: string
  payload: string
}

const loginReducer = (state: LoginRequest, action: LoginAction) => {
  return { ...state, [action.type]: action.payload }
}

const LoginPage = () => {
  const [searchParams] = useSearchParams()

  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useDispatch()
  const [loginRequest, loginDispatch] = useReducer(loginReducer, {
    email: '',
    password: '',
  })
  const { memberInfo } = useSelector((state: RootState) => state.auth)

  // 이미 로그인 중인 상태에서 로그인 페이지 접근 못하게 처리
  useEffect(() => {
    if (memberInfo) {
      navigate('/', { replace: true })
    }
  }, [memberInfo, navigate])

  const checked =
    loginRequest.email.length > 0 && loginRequest.password.length > 0

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target
    loginDispatch({
      type: name,
      payload: value,
    })
  }

  const onLoginButtonClick = async () => {
    try {
      const response = await login(loginRequest)
      const token = response.data
      localStorage.setItem('token', JSON.stringify(token))
      // @ts-ignore
      dispatch(getMemberInfo())
      const redirectUrl = searchParams.get('redirectUrl')
      if (redirectUrl) {
        window.location.href = redirectUrl
      } else {
        navigate('/', { replace: true })
      }
    } catch (e) {
      setErrorMessage(
        '이메일 혹은 비밀번호가 올바르지 않습니다. 다시 시도해주세요.',
      )
    }
  }

  return (
    <Container style={{ marginTop: '20px' }}>
      <div style={{ color: 'grey' }}>
        <h1 className="display-5">로그인</h1>
        <p className="fs-4">
          Ming! Commerce 의 혜택을 누리시려면 로그인을 해주세요.
        </p>
      </div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>이메일 주소</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={onChange}
            value={loginRequest.email}
            placeholder="이메일을 입력해주세요."
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={onChange}
            value={loginRequest.password}
            placeholder="비밀번호를 입력해주세요."
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              size="lg"
              disabled={!checked}
              onClick={onLoginButtonClick}
            >
              로그인
            </Button>
            <Alert
              show={errorMessage.length > 0}
              className="small"
              variant="danger"
            >
              {errorMessage}
            </Alert>
          </div>
        </Form.Group>
      </Form>
      아직 계정이 없으신가요? <Link to="/register">여기서</Link> 회원가입하세요.
    </Container>
  )
}

export default LoginPage
