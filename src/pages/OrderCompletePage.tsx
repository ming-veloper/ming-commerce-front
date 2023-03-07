import { Card, Container, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getOrder } from '../api/order.api'
import { OrderResult } from '../store/order/order.types'

const OrderCompletePage = () => {
  const { orderId } = useParams<{ orderId: string }>()
  console.log(orderId)
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!orderId) {
      navigate('/')
      return
    }
    getOrder(orderId)
      .then((value) => value.data)
      .then((orderResult) => setOrderResult(orderResult))
      .catch((err) => {
        navigate('/')
      })
  }, [navigate, orderId])
  if (!orderResult) {
    navigate('/')
    return null
  }
  return (
    <Container>
      <p className="text-center h1 mt-5">주문이 완료되었습니다.</p>
      <Card className="text-start mt-5">
        <Card.Header>주문번호 : {orderResult.orderId}</Card.Header>
        <ListGroup>
          <ListGroupItem>주문명 : {orderResult.orderName}</ListGroupItem>
          <ListGroupItem>
            주문 가격 : {orderResult.amount.toLocaleString() + ' 원'}
          </ListGroupItem>
        </ListGroup>
      </Card>
    </Container>
  )
}

export default OrderCompletePage
