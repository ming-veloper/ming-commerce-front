import { Container, Nav, Navbar } from 'react-bootstrap'
import { Outlet, useNavigate } from 'react-router-dom'
import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { fetchAllCartList } from '../store/cart/cart.slice'

const navbarStyle: React.CSSProperties = {
  backdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(0,0,0,0.75)',
}
const MingNavBar: FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartList } = useSelector((state: RootState) => state.cart.list)
  const { memberInfo } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (memberInfo) {
      // @ts-ignore
      dispatch(fetchAllCartList())
    }
  }, [dispatch, memberInfo])

  return (
    <>
      <Navbar variant="black" className="sticky-top" style={navbarStyle}>
        <Container>
          <Navbar.Brand onClick={() => navigate('/')} className="text-primary">
            Ming!
          </Navbar.Brand>
          {memberInfo ? (
            <Nav className="float-md-end">
              <Nav.Link
                onClick={() => {
                  navigate('/my-page')
                }}
                className="navbar-tool ms-1 ms-lg-0 me-n1 me-lg-2 text-primary"
              >
                <div className="navbar-tool-icon-box">
                  <i className="navbar-tool-icon ci-user"></i>
                </div>
                <div className="navbar-tool-text ms-n2">
                  <small>안녕하세요.</small>
                  {memberInfo.memberName}님
                </div>
              </Nav.Link>

              <Nav.Link className="navbar-tool ms-3 text-primary">
                <div className="navbar-tool-icon-box bg-secondary">
                  {/*TODO 해당 숫자 증가 카트 추가 기능 구현 시에 구현 예정*/}
                  <span className="navbar-tool-label">{cartList.length}</span>
                  <i className="navbar-tool-icon ci-cart"></i>
                </div>
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="float-md-end">
              <Nav.Link
                className="navbar-tool ms-1 ms-lg-0 me-n1 me-lg-2 text-primary"
                onClick={() => {
                  navigate('/login')
                }}
              >
                <div className="navbar-tool-icon-box">
                  <i className="navbar-tool-icon ci-user"></i>
                </div>
                <div className="navbar-tool-text ms-n2">
                  <small>로그인 해주세요.</small>
                </div>
              </Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
}

export default MingNavBar
