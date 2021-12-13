import React from 'react';
// import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router';

export function Navigation() {
    const navigate = useNavigate();
    
    return (<Navbar bg="light" expand="lg">
        <Container>
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/search">Search</Nav.Link>
                <Nav.Link href="/create">Create New Job</Nav.Link>
                <Nav.Link href="/favorites">Favorites</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link onClick={() => {
                    navigate('/registration', {
                        state: {
                            path: window.location.pathname
                        }
                    });
                }}>Register</Nav.Link>
                <Nav.Link onClick={() => {
                    navigate('/signin', {
                        state: {
                            path: window.location.pathname
                        }
                    });
                }}>Sign In</Nav.Link>
            </Nav>
        </Container>
    </Navbar>);
}