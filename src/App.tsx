import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import LostPassword from './pages/LostPassword'
import MyPage from './pages/MyPage'
import MingNavBar from './components/MingNavBar'
import ProductDetailPage from './pages/ProductDetailPage'

const App = () => {
  return (
    <Routes>
      <Route element={<MingNavBar />}>
        <Route index element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/lost-password" element={<LostPassword />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
      </Route>
    </Routes>
  )
}

export default App
