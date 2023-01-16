//NAV BAR 만들기
import { Alert, Button, Container, Form } from 'react-bootstrap'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import {
  checkEmail,
  registerUser,
  reset,
  set,
} from '../store/register/register.slice'
import { useNavigate } from 'react-router-dom'
import { passwordCondition } from '../store/register/register.types'

const RegisterPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { registerRequest, emailCheck, errorMessage, token } = useSelector(
    (state: RootState) => state.register,
  )

  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  const checked =
    emailCheck === true &&
    Object.values(registerRequest).every(
      (value) => value !== null && value !== '',
    ) &&
    registerRequest.password === registerRequest.passwordConfirm &&
    passwordCondition.test(registerRequest.password)

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target
    if (name === 'email') {
      if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) {
        // @ts-ignore
        dispatch(checkEmail(value))
      }
    }

    // @ts-ignore
    dispatch(set({ name, value }))
  }
  const onRegisterButtonClick = () => {
    console.log(registerRequest)

    // @ts-ignore
    dispatch(registerUser(registerRequest))
  }

  useEffect(() => {
    if (token) {
      //TODO 가입 완료 후 로직.
      // localStorage에 토큰까지 저장 완료.
      // @yeonnex 님이 토큰을 사용하여 사용자 정보 조회 API 로직 만들면 추가 로직 필요.
      navigate('/', {
        replace: true,
      })
    }
  }, [navigate, token])

  return (
    <Container style={{ marginTop: '20px' }}>
      <div style={{ color: 'grey' }}>
        <h1 className="display-5">회원가입</h1>
        <p className="fs-4">Ming! Commerce 의 회원이 되어주세요.</p>
      </div>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>이메일 주소</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={registerRequest.email}
            onChange={onChange}
            placeholder="이메일을 입력해주세요."
          />
          <Alert
            show={emailCheck !== null && emailCheck}
            className="small"
            variant="success"
          >
            사용 가능한 이메일입니다.
          </Alert>
          <Alert
            className="small"
            show={errorMessage.email.length > 0}
            variant="danger"
          >
            {errorMessage.email}
          </Alert>
          <Form.Text className="text-muted">
            Ming! Commerce 는 당신의 이메일을 안전하게 보관합니다.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>이름</Form.Label>
          <Form.Control
            type="text"
            name="memberName"
            value={registerRequest.memberName}
            onChange={onChange}
            placeholder="이름을 입력해주세요."
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={registerRequest.password}
            onChange={onChange}
            placeholder="비밀번호를 입력해주세요."
          />
          <Alert
            show={errorMessage.password.length > 0}
            className="small"
            variant="danger"
          >
            {errorMessage.password}
          </Alert>
          <Form.Text className="text-muted">
            비밀번호는 8글자 이상 16글자 미만으로 구성해주세요.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            type="password"
            name="passwordConfirm"
            value={registerRequest.passwordConfirm}
            onChange={onChange}
            placeholder="비밀번호와 동일하게 입력해주세요."
          />
          <Alert
            show={errorMessage.passwordConfirm.length > 0}
            className="small"
            variant="danger"
          >
            {errorMessage.passwordConfirm}
          </Alert>
          <Form.Text className="text-muted">
            비밀번호 확인은 비밀번호와 똑같이 입력해주세요.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              size="lg"
              disabled={!checked}
              onClick={onRegisterButtonClick}
            >
              가입하기
            </Button>
          </div>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default RegisterPage
