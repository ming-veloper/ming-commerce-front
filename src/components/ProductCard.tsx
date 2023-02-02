import { FC } from 'react'
import { Card } from 'react-bootstrap'
import { Product } from '../store/product/product.types'
import { useNavigate } from 'react-router-dom'

type ProductCardProp = { product: Product }
const ProductCard: FC<ProductCardProp> = ({ product }) => {
  const navigate = useNavigate()
  return (
    <Card
      className="product-card card-static shadow col-lg-4 col-5 px-0 px-sm-2 mb-sm-4"
      style={{ margin: '10px' }}
      onClick={() => {
        navigate(`/products/${product.productId}`)
      }}
    >
      <Card.Img
        variant="top"
        style={{
          width: 'auto',
          height: 'auto',
          maxHeight: '10rem',
          maxWidth: '10rem',
        }}
        src={product.thumbnailImageUrl}
        alt={product.productName}
      />
      <Card.Body>
        <a className="product-meta d-block fs-xs pb-1" href="#">
          {product.category.categoryName}
        </a>
        <h3 className="product-title fs-sm text-truncate">
          <span>{product.productName}</span>
        </h3>
        <div className="d-flex justify-content-between">
          <div className="product-price">
            <span className="text-accent">${product.price}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
