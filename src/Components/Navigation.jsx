import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router';


export function Navigation() {
    const navigate = useNavigate();

    const username = localStorage.getItem("loggedIn");

    const createNav = () => {
        if (username) return (<Nav.Link href="/create">Create</Nav.Link>);
    }

    const favNav = () => {
        if (username) return (<Nav.Link href="/favorites">Favorites</Nav.Link>);
    }


    const navigateTo = (path) => {
        navigate(path, {
            state: {
                path: window.location.pathname
            }
        });
    }


    return (<Navbar bg="light" expand="lg">
        <Container>
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                {createNav()}
                {favNav()}
            </Nav>
            <Nav>
                <Nav.Link onClick={() => {
                    if (username) {

                    } else {
                        navigateTo('/registration');
                    }
                }}>{username ? username.replace(/"/g, "") : 'Register'}</Nav.Link>
                <Nav.Link onClick={() => {
                    if (username) {
                        localStorage.removeItem("loggedIn");
                        localStorage.removeItem("username");
                        navigateTo('/signin');
                    } else {
                        navigateTo('/signin');
                    }
                }}>{username ? 'Logout' : 'Login'}</Nav.Link>
            </Nav>
        </Container>
    </Navbar>);
}