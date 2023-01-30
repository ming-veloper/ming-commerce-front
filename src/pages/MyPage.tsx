import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Button, Container } from 'react-bootstrap'

const MyPage = () => {
  const { memberInfo } = useSelector((state: RootState) => state.auth)
  if (!memberInfo) return null
  //TODO 유저 정보 API 사용 필요

  const onClickLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('memberInfo')
    document.location.href = '/'
  }
  return (
    <Container>
      <h2 className="h2 mb-0 pt-3 me-3">My Page</h2>
      <Button variant="danger" onClick={onClickLogout}>
        로그아웃
      </Button>
    </Container>
  )
}

export default MyPage
