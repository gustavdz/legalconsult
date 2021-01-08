import React from "react";
import { Col, Row } from "react-bootstrap";
import Meta from "../components/Meta";
import IntroImg from "../assets/img/intro-img.svg";

const LandingPageScreen = () => {
  return (
    <>
      <Meta />
      <main className="">
        <section id="intro" className="clearfix">
          <div className="container">
            <div className="intro-img">
              <img src={IntroImg} alt="" className="img-fluid" />
            </div>

            <div className="intro-info">
              <h2>
                We provide
                <br />
                <span>solutions</span>
                <br />
                for your business!
              </h2>
              <div>
                <a href="#about" className="btn-get-started scrollto">
                  Get Started
                </a>
                <a href="#services" className="btn-services scrollto">
                  Our Services
                </a>
              </div>
            </div>
          </div>
        </section>
        <h1>Landing Page</h1>
        <Row>
          <Col sm={12} md={6} lg={4} xl={3}>
            <p>Aqui empieza la pagina principal.</p>
          </Col>
        </Row>
      </main>
    </>
  );
};

export default LandingPageScreen;
