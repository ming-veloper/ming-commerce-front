import { Button, Container, Form, Spinner } from 'react-bootstrap'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductDetail, initDetail } from '../store/product/product.slice'
import { RootState } from '../store'

const Section: FC<{ children: Array<JSX.Element> }> = ({ children }) => {
  return <section className="row g-0 mx-n2 pb-5 mb-xl-3">{children}</section>
}

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()
  // @ts-ignore
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchProductDetail(productId))
    // @ts-ignore
    return () => dispatch(initDetail())
  }, [dispatch, productId])

  const { productDetail, loading } = useSelector(
    (state: RootState) => state.product.detail,
  )
  const { memberInfo } = useSelector((state: RootState) => state.auth)

  const onQuantityChange = ({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(target.value))
  }
  const onAddCartClick = () => {
    if (!memberInfo) {
      navigate(`/login?redirectUrl=${window.location.href}`)
    }
  }

  if (loading) {
    return (
      <Container>
        <Spinner animation="grow" />
        <Spinner animation="grow" />
        <Spinner animation="grow" />
        <Spinner animation="grow" />
        loading...
      </Container>
    )
  }

  return (
    <Container>
      {productDetail && (
        <Section>
          <div className="col-xl-7 px-2 mb-3">
            <div className="h-100 bg-light rounded-3 p-4">
              <div className="product-gallery">
                <div className="product-gallery-preview order-sm-2">
                  <div className="product-gallery-preview-item active">
                    <img
                      style={{
                        width: 'auto',
                        height: 'auto',
                      }}
                      src={productDetail.thumbnailImageUrl}
                      alt="Product image"
                    />
                  </div>
                </div>
                <div className="product-gallery-thumblist order-sm-1">
                  <a className="product-gallery-thumblist-item active">
                    <img
                      src={productDetail.thumbnailImageUrl}
                      alt="Product thumb"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-5 px-2 mb-3">
            <div className="h-100 bg-light rounded-3 py-5 px-4 px-sm-5">
              <a className="product-meta d-block fs-sm pb-2" href="#">
                {productDetail.category.categoryName}
              </a>
              <h1 className="h2">{productDetail.productName}</h1>
              <div className="h2 fw-normal text-accent">
                ${productDetail.price}
              </div>
              <div className="d-flex flex-wrap align-items-center pt-4 pb-2 mb-3">
                <Form.Select
                  className="mb-3 mb-3 me-1"
                  style={{ width: '5rem' }}
                  value={quantity}
                  onChange={onQuantityChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Select>
                <Button
                  variant="primary"
                  className="btn-shadow me-3 mb-3"
                  onClick={onAddCartClick}
                >
                  <i className="ci-cart fs-lg me-2"></i>Add to Cart
                </Button>
              </div>
              <h6>상품 상세</h6>
              <ul className="list-unstyled fs-sm pt-2 mb-0">
                <li>
                  <i className="ci-check-circle text-success me-2"></i>
                  {productDetail.description}
                </li>
              </ul>
            </div>
          </div>
        </Section>
      )}
    </Container>
  )
}

export default ProductDetailPage
