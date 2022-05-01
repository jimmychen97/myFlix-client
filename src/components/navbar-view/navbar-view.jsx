import React from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

export function NavbarView({user}) {

    const isAuthorizated = () => {
        if (localStorage.getItem('token')) {
            return localStorage.getItem('token');
        } else {
            return false;
        }
    }

    const onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    }

    return (
        <Navbar className='main-nav' sticky='top' bg='light' expand='lg'>
            <Container>
                <Navbar.Brand href='/'>MyFlix</Navbar.Brand>
                <Nav className='me-auto'>
                    {isAuthorizated() && (<Nav.Link href={`/users/${user}`}>{user}</Nav.Link>)}
                    {isAuthorizated() && (<Button variant='link' onClick={()=> onLoggedOut()}>Logout</Button>)}
                    {!isAuthorizated() && (<Nav.Link href='/'>Sign In</Nav.Link>)}
                    {!isAuthorizated() && (<Nav.Link href='/register'>Sign Up</Nav.Link>)}
                </Nav>
            </Container>
        </Navbar>
    )
}