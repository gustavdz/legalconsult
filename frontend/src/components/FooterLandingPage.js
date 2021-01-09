import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const FooterLandingPage = () => {
  const year = new Date();
  const heartStyle = { color: "#be1931" };
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            &copy; {year.getFullYear()} LegalConsult. All Rights Reserved.
            <br /> Made with{" "}
            <i
              className="fa fa-heart"
              aria-hidden="true"
              style={heartStyle}
            ></i>{" "}
            by{" "}
            <a
              href="https://www.deckasoft.com"
              target="_blank"
              rel="noreferrer"
            >
              Deckasoft
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterLandingPage;
