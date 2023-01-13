import { Link } from 'react-router-dom'

const MainPage = () => {
  return (
    <div>
      <h2>메인</h2>
      <p>메인 페이지입니다.</p>
      <ul>
        <li>
          <Link to="/login">로그인 페이지 링크 테스트</Link>
        </li>
        <li>
          <Link to="/register">회원가입 페이지 링크 테스트</Link>
        </li>
        <li>
          <Link to="/my-page">마이 페이지 링크 테스트</Link>
        </li>
        <li>
          <Link to="/lost-password">lost-password 페이지 링크 테스트</Link>
        </li>
      </ul>
    </div>
  )
}

export default MainPage
