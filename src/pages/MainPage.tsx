import { Alert, Container } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import ProductList from '../api/ProductList'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { fetchProductList } from '../store/product/product.slice'
import { ProductCategory } from '../store/product/product.types'

const MainPage = () => {
  const { loading, productList } = useSelector(
    (state: RootState) => state.product.list,
  )
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')

  useEffect(() => {
    const message = localStorage.getItem('message') as string
    if (message) {
      setMessage(message)
      localStorage.removeItem('message')
    }
  }, [])

  useEffect(() => {
    // @ts-ignore
    dispatch(
      // @ts-ignore
      fetchProductList({ category: ProductCategory.DAIRY_EGGS, page: 0 }),
    )
  }, [dispatch])

  return (
    <Container>
      {message && (
        <Alert variant="info" className="mt-4 pt-3 me-3">
          {message}
        </Alert>
      )}
      <h2 className="h3 mb-0 pt-3 me-3">Bestsellers</h2>
      <hr />
      <ProductList loading={loading} productList={productList} />
    </Container>
  )
}

export default MainPage
