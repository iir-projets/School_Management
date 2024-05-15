import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/logo-1.png"; // Make sure the logo path is correct

export const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <Container>
        <Row className="align-items-center justify-content-between">
          <Col xs={12} md={4} className="text-center text-md-left mb-3 mb-md-0">
            <img src={logo} alt="School Logo" className="footer-logo" />
          </Col>
          <Col xs={12} md={4} className="text-center">
            <p>Contact Us: info@schoolsystemEMSI.com</p>
            <p>Phone: (123) 456-7890</p>
          </Col>
          <Col xs={12} md={4} className="text-center text-md-right">
            <p>Visit our <a href="#faq" style={{ color: "#fff" }}>FAQs</a> or <a href="#help" style={{ color: "#fff" }}>Help page</a></p>
            <p>Follow us on <a href="#socials" style={{ color: "#fff" }}>social media</a></p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} School Management System EMSI . All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
