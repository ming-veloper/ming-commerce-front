import { FC } from 'react'
import { MyOrder } from '../store/order/order.types'
import { Card, Col, Row } from 'react-bootstrap'
import moment from 'moment'
import 'moment/locale/ko'

export const MyOrderCard: FC<{ order: MyOrder; onClick: () => void }> = ({
  order,
  onClick,
}) => {
  return (
    <Card
      className="product-card card-static shadow"
      style={{ margin: '10px' }}
      onClick={onClick}
    >
      <Row>
        <Col xs={3}>
          <Card.Img
            variant="top"
            className="ms-3 mt-3"
            style={{
              width: '50px',
              height: '50px',
            }}
            src={order.thumbnailImageUrl}
            alt={order.orderName}
          />
        </Col>
        <Col className="me-4" style={{ fontSize: 'small' }}>
          <Row>{order.orderName}</Row>
          <Row className="text-accent justify-content-end">
            {moment(order.updatedDate).utc(true).fromNow()} 주문
          </Row>
          <Row className="text-primary justify-content-end">
            {order.totalAmount.toLocaleString()}원
          </Row>
        </Col>
      </Row>
    </Card>
  )
}
