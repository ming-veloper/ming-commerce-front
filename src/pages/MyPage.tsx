import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyOrder } from '../api/order.api'
import { MyOrder } from '../store/order/order.types'
import MyOrderList from '../components/MyOrderList'
import { checkEmail, reset } from '../store/register/register.slice'
import { sendEmail } from '../api/auth.api'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios'

const MY_ORDER_SIZE = 5
const MyPage = () => {
  const { memberInfo } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [myOrderList, setMyOrderList] = useState<Array<MyOrder>>([])
  const [isLast, setIsLast] = useState(false)
  const [page, setPage] = useState(1)
  const { emailCheck, errorMessage } = useSelector(
    (state: RootState) => state.register,
  )
  const [email, setEmail] = useState('')
  const [sendSuccess, setSendSuccess] = useState(false)
  const [sendFail, setSendFail] = useState(false)
  const [sendFailMessage, setSendFailMessage] = useState('')
  useEffect(() => {
    dispatch(reset())
  }, [dispatch])
  useEffect(() => {
    if (!memberInfo) {
      navigate('/', { replace: true })
    }
    getMyOrder(1, MY_ORDER_SIZE)
      .then((response) => response.data)
      .then((result) => {
        setMyOrderList(result.content)
        setIsLast(result.last)
      })
  }, [memberInfo, navigate])

  const onClickLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('memberInfo')
    document.location.href = '/'
  }

  const onClickMoreOrders = async () => {
    const nextPage = page + 1
    setPage(nextPage)
    const response = await getMyOrder(nextPage, MY_ORDER_SIZE)
    const nextMyOrders = response.data
    setMyOrderList([...myOrderList, ...nextMyOrders.content])
    setIsLast(nextMyOrders.last)
  }

  const onChangeEmail = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target
    if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) {
      // @ts-ignore
      dispatch(checkEmail(value))
    }
    setEmail(value)
  }

  const onClickChangeEmail = async () => {
    try {
      const response = await sendEmail({ email })
      if (response.status === 200) {
        setSendSuccess(true)
        setSendFail(false)
      }
      // @ts-ignore
    } catch (err: AxiosError) {
      const { message } = err.response.data
      setSendFailMessage(message)
      setSendSuccess(false)
      setSendFail(true)
    }
  }

  return (
    <Container>
      <h1 className="mb-0 pt-3 me-3">My Page</h1>
      <Button variant="danger" onClick={onClickLogout}>
        ????????????
      </Button>
      <Row className="mx-n2 mt-5">
        <Col>
          <h2>????????? ?????? ??????</h2>
          <Form.Group className="mb-3">
            <Form.Label>????????? ??????</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={onChangeEmail}
              placeholder="???????????? ??????????????????."
            />
            <Alert
              show={emailCheck !== null && emailCheck}
              className="small"
              variant="success"
            >
              ?????? ????????? ??????????????????.
            </Alert>
            <Alert
              className="small"
              show={errorMessage.email.length > 0}
              variant="danger"
            >
              {errorMessage.email}
            </Alert>
            <Alert className="small" show={sendSuccess} variant="info">
              {email} ??? ?????? ????????? ???????????????.
            </Alert>
            <Alert className="small" show={sendFail} variant="danger">
              {sendFailMessage}
            </Alert>
          </Form.Group>
          <Form.Group className="mb-3">
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                size="lg"
                disabled={!emailCheck}
                onClick={onClickChangeEmail}
              >
                ????????????
              </Button>
            </div>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mx-n2 mt-5">
        <Col>
          <h2>?????? ?????? ????????????</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            {myOrderList && <MyOrderList myOrders={myOrderList} />}
          </ListGroup>
        </Col>
      </Row>
      {!isLast && (
        <Row className="ms-1 me-1">
          <Button variant="warning" onClick={onClickMoreOrders}>
            ?????????
          </Button>
        </Row>
      )}
    </Container>
  )
}

export default MyPage
