//NAV BAR 만들기
import { Button, Container, Form } from 'react-bootstrap'

const RegisterPage = () => {
  return (
    <Container style={{ marginTop: '10px' }}>
      <div>
        <h1 className="display-5">회원가입</h1>
        <p className="fs-4">Ming! Commerce 의 회원이 되어주세요.</p>
      </div>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>이메일 주소</Form.Label>
          <Form.Control type="email" placeholder="이메일을 입력해주세요." />
          <Form.Text className="text-muted">
            Ming! Commerce 는 당신의 이메일을 안전하게 보관합니다.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>이름</Form.Label>
          <Form.Control type="text" placeholder="이름을 입력해주세요." />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호와 동일하게 입력해주세요."
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" type="submit">
              가입하기
            </Button>
          </div>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default RegisterPage
