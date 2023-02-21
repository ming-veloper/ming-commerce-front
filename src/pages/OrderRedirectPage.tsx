import { useNavigate, useSearchParams } from 'react-router-dom'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { useEffect } from 'react'
import { payment } from '../api/payment.api'

const OrderRedirectPage = () => {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId') as string
  const paymentKey = searchParams.get('paymentKey') as string
  const amount = Number(searchParams.get('amount'))
  const navigate = useNavigate()
  useEffect(() => {
    ;(async () => {
      if (orderId && paymentKey && amount) {
        const paymentResponse = await payment({ orderId, paymentKey, amount })
        const data = paymentResponse.data
        console.log(data)
        navigate(`/my-page/order/${data.orderId}`)
      }
    })()
  }, [orderId, paymentKey, amount, navigate])
  return (
    <Container fluid="md">
      <Row className="justify-content-center">
        <Col className="text-center">
          <Spinner
            variant="primary"
            style={{ width: '300px', height: '300px' }}
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col className="text-center">결제중입니다.</Col>
      </Row>
      <Row>
        <Col className="text-center">
          ### 여기서 결제 API 호출, 결제 완료 후 주문 완료 창으로 다시
          리다이렉트 ###
        </Col>
      </Row>
      <Row>
        <Col>
          <span className="fw-bold">orderId:</span> {orderId}
        </Col>
      </Row>
      <Row>
        <Col>
          <span className="fw-bold">paymentKey:</span> {paymentKey}
        </Col>
      </Row>
      <Row>
        <Col>
          <span className="fw-bold">amount:</span> {amount}
        </Col>
      </Row>
    </Container>
  )
}

export default OrderRedirectPage
