import { Alert, Button, Card, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { deleteCartAction, fetchAllCartList } from '../../store/cart/cart.slice'
import CartLine from '../../components/CartLine'
import cartEmptyImage from '../../cart_empty.png'
import { loadTossPayments } from '@tosspayments/payment-sdk'
import { order } from '../../api/order.api'

const changeUserAgent = () => {
  Object.defineProperties(navigator, {
    userAgent: {
      get: () => `Ming Commerce Toss Payments`,
    },
  })
}

const getClientKey = (): string => {
  return process.env.REACT_APP_TOSS_CLIENT_KEY as string
}

const CartPage = () => {
  const { memberInfo } = useSelector((state: RootState) => state.auth)
  const { cartProductList } = useSelector((state: RootState) => state.cart.list)
  const [totalPrice, setTotalPrice] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [cartIdList, setCartIdList] = useState<Array<string>>([])
  const onClickCartLine = (cartLineId: string) => {
    if (cartIdList.includes(cartLineId)) {
      setCartIdList(cartIdList.filter((e) => e !== cartLineId))
    } else {
      setCartIdList([...cartIdList, cartLineId])
    }
  }

  const onDeleteClick = (productId: string, cartId: string) => {
    // @ts-ignore
    dispatch(deleteCartAction({ productId }))
    setCartIdList(cartIdList.filter((e) => e !== cartId))
    setTimeout(() => {
      // @ts-ignore
      dispatch(fetchAllCartList())
    }, 200)
  }

  useEffect(() => {
    if (memberInfo == null) {
      navigate('/', { replace: true })
      return
    }
    // @ts-ignore
    dispatch(fetchAllCartList())
  }, [dispatch, memberInfo, navigate])
  useEffect(() => {
    const totalPrice = cartProductList
      .filter((e) => cartIdList.includes(e.uuid))
      .map((e) => e.price * e.quantity)
      .reduce((accumulator, current) => {
        return current + accumulator
      }, 0)
    setTotalPrice(Number(totalPrice.toFixed(2)))
  }, [cartIdList, cartProductList])

  const onClickOrder = async () => {
    if (!memberInfo) return
    const clientKey = getClientKey()
    const response = await order({
      cartLineUuidList: cartIdList,
    })

    const orderResponse = response.data
    changeUserAgent()
    await loadTossPayments(clientKey).then((tossPayments) => {
      tossPayments.requestPayment('토스페이', {
        amount: orderResponse.amount,
        orderId: orderResponse.orderId,
        customerName: memberInfo.memberName,
        orderName: orderResponse.orderName,
        customerEmail: memberInfo.email,
        successUrl: `${window.location.origin}/order_redirect`,
        failUrl: `${window.location.origin}/order_redirect`,
      })
    })
  }
  return (
    <Container>
      {cartProductList.length > 0 ? (
        <div className="col-xl-5 offset-xl-1 mb-2">
          <div className="bg-light rounded-3 py-5 px-4 px-xxl-5">
            <h2 className="h5 pb-3">My Cart</h2>
            {cartProductList.map((cartProduct) => (
              <CartLine
                key={cartProduct.productId}
                cartProduct={cartProduct}
                onDeleteClick={onDeleteClick}
                onClickCartLine={onClickCartLine}
              />
            ))}
            {cartIdList.length > 0 && (
              <>
                <ul className="list-unstyled fs-sm pt-4 pb-2 border-bottom">
                  <li className="d-flex justify-content-between align-items-center">
                    <span className="me-2">합계:</span>
                    <span className="text-end fw-medium">${totalPrice}</span>
                  </li>
                </ul>
                <h3 className="fw-normal text-center my-4 py-2">
                  총 가격 : ${totalPrice}
                </h3>
              </>
            )}
          </div>
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              size="lg"
              onClick={onClickOrder}
              disabled={cartIdList.length === 0}
            >
              {cartIdList.length > 0
                ? `Toss로 ${(totalPrice * 1000).toLocaleString(
                    'ko-KR',
                  )}원 결제하기`
                : 'Toss로 결제하기'}
            </Button>
            {cartIdList.length > 0 && (
              <Alert variant="danger">⚠️실제로 결제가 되지 않습니다.</Alert>
            )}
          </div>
        </div>
      ) : (
        <>
          <Card>
            <Card.Img variant="top" src={cartEmptyImage} />
            <Card.Body>
              <Card.Title>아직 상품을 담지 않았어요...!</Card.Title>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  )
}

export default CartPage
