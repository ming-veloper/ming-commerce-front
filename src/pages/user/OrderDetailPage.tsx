import React, { FC, useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getMyOrderDetail } from '../../api/order.api'
import { OrderDetail, OrderProductDetail } from '../../store/order/order.types'
import 'moment/locale/ko'
import moment from 'moment'

const ProductDetailElement: FC<{
  productDetail: OrderProductDetail
}> = ({ productDetail }) => {
  return (
    <div className="d-flex align-items-center pb-2 border-bottom">
      <span className="d-block flex-shrink-0">
        <img src={productDetail.thumbnailImageUrl} width="64" alt="Product" />
      </span>
      <div className="ps-2">
        <h6 className="widget-product-title">
          <a href={`/products/${productDetail.productId}`}>
            {productDetail.productName}
          </a>
        </h6>
        <div className="widget-product-meta">
          <span className="text-accent me-2">{productDetail.price}$</span>
          <span className="text-muted">x {productDetail.quantity}</span>
        </div>
      </div>
    </div>
  )
}

const OrderDetailPage: FC = () => {
  const { orderId } = useParams<{ orderId: string }>()
  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null)

  useEffect(() => {
    if (!orderId) return
    ;(async () => {
      const response = await getMyOrderDetail(orderId)
      if (response.status !== 200) return
      const orderDetail = response.data
      if (orderDetail) setOrderDetail(orderDetail)
    })()
  }, [orderId])

  if (!orderDetail) return null
  return (
    <Container>
      <h1 className="mb-0 pt-3 me-3">주문 상세</h1>
      <Row className="ms-1 me-1 mt-1">{orderDetail.orderName}</Row>

      <Row className="mt-1">
        <span>
          <strong>결제금액</strong> : {orderDetail.totalAmount.toLocaleString()}{' '}
          원
        </span>
      </Row>
      <Row className="mt-1">
        <span>
          <strong>주문일자</strong> :{' '}
          {moment(orderDetail.createdDate)
            .utc(true)
            .format('yyyy년 M월 D일 HH시 mm분 ss초')}
        </span>
      </Row>
      <Row className="mx-n2 mt-5">
        {orderDetail.productDetailList.map((productDetail) => (
          <ProductDetailElement
            key={productDetail.productId}
            productDetail={productDetail}
          />
        ))}
      </Row>
    </Container>
  )
}

export default OrderDetailPage
