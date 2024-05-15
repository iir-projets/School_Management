import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/logo-1.png';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img src={logo} alt="School Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/home" className="navbar-link" activeclassname="active">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/students" className="navbar-link" activeclassname="active">Students</Nav.Link>
            <Nav.Link as={NavLink} to="/teachers" className="navbar-link" activeclassname="active">Teachers</Nav.Link>
            <Nav.Link as={NavLink} to="/courses" className="navbar-link" activeclassname="active">Absence</Nav.Link>
            <Nav.Link as={NavLink} to="/login" className="navbar-link" activeclassname="active">Login/Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
