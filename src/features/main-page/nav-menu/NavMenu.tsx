import { Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import UserAvatar from './user-avatar/UserAvatar';

const NavMenu = (): JSX.Element => {
  return (
    <Navbar sticky="top" bg="primary" variant="dark" expand="sm">
      <Container>
        <Navbar.Toggle aria-controls="navbar-main" />
        <LinkContainer to="/">
          <Navbar.Brand>RS Lang</Navbar.Brand>
        </LinkContainer>
        <Navbar.Offcanvas id="navbar-main">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>RS Lang</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="me-auto">
              <LinkContainer to="/dictionary">
                <Nav.Link>Dictionary</Nav.Link>
              </LinkContainer>
              <NavDropdown title="Mini-games" id="nav-dropdown-games">
                <LinkContainer to="games/audio-challenge">
                  <NavDropdown.Item>Audio Challenge</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="games/sprint">
                  <NavDropdown.Item>Sprint</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <LinkContainer to="/statistics">
                <Nav.Link>Statistics</Nav.Link>
              </LinkContainer>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <LinkContainer to="/auth">
          <Nav.Link>
            <UserAvatar />
          </Nav.Link>
        </LinkContainer>
      </Container>
    </Navbar>
  );
};

export default NavMenu;
