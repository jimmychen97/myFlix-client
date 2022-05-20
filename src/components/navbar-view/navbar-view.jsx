import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

export function NavbarView({ user }) {
  const isAuthorizated = () => {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  };

  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };

  return (
    <Navbar
      style={{ margin: '0px 0px 20px 0px' }}
      sticky="top"
      bg="dark"
      expand="lg"
    >
      <Container fluid className="p-0">
        <Navbar.Brand href="/" style={{ color: 'White' }}>
          MyFlix
        </Navbar.Brand>
        <Nav className="me-auto" variant="pills">
          {isAuthorizated() && (
            <Nav.Link style={{ color: 'White' }} href={`/users/${user}`}>
              {user}
            </Nav.Link>
          )}
          {isAuthorizated() && (
            <Button variant="light" onClick={() => onLoggedOut()}>
              Logout
            </Button>
          )}
          {!isAuthorizated() && (
            <Nav.Link style={{ color: 'White' }} href="/">
              Sign In
            </Nav.Link>
          )}
          {!isAuthorizated() && (
            <Nav.Link style={{ color: 'White' }} href="/register">
              Create Account
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
