import { Container } from 'react-bootstrap'
import { FC, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { changeEmail } from '../api/auth.api'
import { getMemberInfo } from '../store/auth/auth.slice'
import { useDispatch } from 'react-redux'

const UserUpdateLinkPage: FC = () => {
  const [searchParams] = useSearchParams()
  const [token, setToken] = useState<string | undefined | null>('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const token = searchParams.get('token') as string
    setToken(token)
    console.log(token)
  }, [searchParams])

  useEffect(() => {
    if (!token) return
    changeEmail({ token })
      .then((response) => response.data)
      .then((token) => {
        localStorage.setItem('token', JSON.stringify(token))
        // @ts-ignore
        dispatch(getMemberInfo())
        localStorage.setItem('message', `이메일이 성공적으로 변경되었습니다.`)
        navigate('/', { replace: true })
      })
      .catch((err) => {
        console.error(err)
      })
  }, [token, navigate, dispatch])

  return (
    <Container>
      <h1 className="mb-0 pt-3 me-3">사용자 변경 인증</h1>
    </Container>
  )
}

export default UserUpdateLinkPage
