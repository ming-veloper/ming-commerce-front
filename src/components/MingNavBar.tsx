import { Container, Nav, Navbar } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { FC } from 'react'
import { MemberInfo } from '../store/auth/auth.types'

const MingNavBar: FC<{
  memberInfo: MemberInfo | null
}> = ({ memberInfo }) => {
  return (
    <>
      <Navbar bg="black" variant="black">
        <Container>
          <Navbar.Brand href="#home">Ming! Commerce</Navbar.Brand>
          <Nav className="me-auto"></Nav>
          {memberInfo && (
            <div>
              <a className="navbar-tool ms-1 ms-lg-0 me-n1 me-lg-2" href="#">
                <div className="navbar-tool-icon-box">
                  <i className="navbar-tool-icon ci-user"></i>
                </div>
                <div className="navbar-tool-text ms-n2">
                  <small>안녕하세요.</small>
                  {memberInfo.memberName}님
                </div>
              </a>
            </div>
          )}
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
}

export default MingNavBar
