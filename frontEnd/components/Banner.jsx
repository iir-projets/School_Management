import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.svg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ["Igniting Academic Prowess", "Nurturing Brilliant Futures", "Unlocking Student Potential"];
  const period = 2500;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  };

  return (
      <section className="banner" id="home" style={{ backgroundColor: '#F5F5F5', color: '#333333' }}>
        <Container>
          <Row className="align-items-center">
            <Col xs={12} md={7} xl={8}>
              <TrackVisibility>
                {({ isVisible }) => (
                    <div className={isVisible ? "animate__animated animate__fadeInLeft" : ""}>
                      <span className="tagline" style={{ fontFamily: 'Montserrat, sans-serif', color: '#7D4E57' }}>Pioneering Educational Transformation</span>
                      <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#2C3639' }}>{`AcademiaElite: `}<span className="txt-rotate" dataperiod="1000" data-rotate='[ "Igniting Academic Prowess", "Nurturing Brilliant Futures", "Unlocking Student Potential" ]'><span className="wrap" style={{ fontFamily: 'Playfair Display, serif', color: '#2C3639' }}>{text}</span></span></h1>
                      <p style={{ fontFamily: 'Lora, serif', color: '#4E4E4E', fontSize : 30, marginBottom :'65px' }}>Experience a revolutionary approach to education with our cutting-edge platform, designed to ignite academic excellence and propel students toward remarkable achievements.</p>
                      <Link to="/students" className="primary-btn" style={{ backgroundColor: '#7D4E57', color: '#FFFFFF', fontFamily: 'Montserrat, sans-serif', borderRadius: '25px', padding: '24px 48px', fontSize : 30  }}>Unleash Your Potential <ArrowRightCircle size={25} style={{ marginLeft: '8px' }} /></Link>
                    </div>
                )}
              </TrackVisibility>
            </Col>
            <Col xs={12} md={5} xl={4}>
              <TrackVisibility>
                {({ isVisible }) => (
                    <div className={isVisible ? "animate__animated animate__fadeInRight" : ""}>
                      <img src={headerImg} alt="Education Banner" className="img-fluid" style={{ borderRadius: '8px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }} />
                    </div>)}
              </TrackVisibility>
            </Col>
          </Row>
        </Container>
      </section>
  )
}