import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import LostPassword from './pages/LostPassword'
import MyPage from './pages/MyPage'
import MingNavBar from './components/MingNavBar'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import OrderRedirectPage from './pages/OrderRedirectPage'
import OrderCompletePage from './pages/OrderCompletePage'

const App = () => {
  return (
    <Routes>
      <Route element={<MingNavBar />}>
        <Route index element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/lost-password" element={<LostPassword />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/my-page">
          <Route path="order/:orderId" element={<OrderCompletePage />} />
        </Route>
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>
      <Route path="/order_redirect" element={<OrderRedirectPage />} />
    </Routes>
  )
}

export default App
