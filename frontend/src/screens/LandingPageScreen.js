import React from "react";
import { Col, Row } from "react-bootstrap";
import Meta from "../components/Meta";

const LandingPageScreen = () => {
  return (
    <>
      <Meta />
      <h1>Landing Page</h1>
      <Row>
        <Col sm={12} md={6} lg={4} xl={3}>
          <p>Aqui empieza la pagina principal.</p>
        </Col>
      </Row>
    </>
  );
};

export default LandingPageScreen;
