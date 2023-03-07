import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyOrder } from '../api/order.api'
import { MyOrder } from '../store/order/order.types'
import MyOrderList from '../components/MyOrderList'

const MY_ORDER_SIZE = 5
const MyPage = () => {
  const { memberInfo } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()
  const [myOrderList, setMyOrderList] = useState<Array<MyOrder>>([])
  const [isLast, setIsLast] = useState(false)
  const [page, setPage] = useState(1)
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

  return (
    <Container>
      <h1 className="mb-0 pt-3 me-3">My Page</h1>
      <Button variant="danger" onClick={onClickLogout}>
        로그아웃
      </Button>
      <Row className="mx-n2 mt-5">
        <Col>
          <h2>나의 최근 주문목록</h2>
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
            더보기
          </Button>
        </Row>
      )}
    </Container>
  )
}

export default MyPage
