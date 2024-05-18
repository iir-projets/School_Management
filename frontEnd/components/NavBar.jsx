import React, { useState, useEffect, useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import logo from '../assets/img/logo-1.png';
import { NavLink, useLocation } from 'react-router-dom'; // Import useLocation
import { AuthContext } from '../src/AuthContext';

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  const location = useLocation(); // Get current location

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogoutClick = () => {
    handleLogout();
  };

  // Add a key to the Navbar to force re-render when location or isLoggedIn changes
  return (
      <Navbar key={`${location.pathname}-${isLoggedIn}`} expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            <img src={logo} alt="School Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/home" className="navbar-link" activeClassName="active">
                Home
              </Nav.Link>
              {isLoggedIn ? (
                  <>
                    <Nav.Link as={NavLink} to="/students" className="navbar-link" activeClassName="active">
                      Students
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/teachers" className="navbar-link" activeClassName="active">
                      Teachers
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/courses" className="navbar-link" activeClassName="active">
                      Absence
                    </Nav.Link>
                    <Button variant="outline-danger" onClick={handleLogoutClick}>Logout</Button>
                  </>
              ) : (
                  <>
                    <Nav.Link as={NavLink} to="/login" className="navbar-link" activeClassName="active">
                      Login
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/register" className="navbar-link" activeClassName="active">
                      Register
                    </Nav.Link>
                  </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};
