import { Container, Nav, Navbar } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

const MingNavBar = () => {
  return (
    <>
      <Navbar bg="black" variant="black">
        <Container>
          <Navbar.Brand href="#home">Ming! Commerce</Navbar.Brand>
          <Nav className="me-auto"></Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
}

export default MingNavBar
