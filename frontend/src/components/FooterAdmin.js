import React from "react";
import moment from "moment-timezone";
import { Row, Col, Card } from "@themesberg/react-bootstrap";

const FooterAdmin = () => {
  const currentYear = moment().get("year");
  const heartStyle = { color: "#be1931" };
  return (
    <footer className="footer section py-5">
      <Row>
        <Col xs={12} lg={6} className="mb-4 mb-lg-0">
          <p className="mb-0 text-center text-xl-left">
            Copyright © {`${currentYear} `} LegalConsult. Made with{" "}
            <i
              className="fa fa-heart"
              aria-hidden="true"
              style={heartStyle}
            ></i>{" "}
            by{" "}
            <Card.Link
              href="https://deckasoft.com"
              target="_blank"
              className="text-blue text-decoration-none fw-normal"
            >
              Deckasoft
            </Card.Link>
          </p>
        </Col>
        <Col xs={12} lg={6}>
          <ul className="list-inline list-group-flush list-group-borderless text-center text-xl-right mb-0">
            <li className="list-inline-item px-0 px-sm-2">
              <Card.Link href="https://deckasoft.com" target="_blank">
                About
              </Card.Link>
            </li>
            <li className="list-inline-item px-0 px-sm-2">
              <Card.Link href="https://deckasoft.com" target="_blank">
                Themes
              </Card.Link>
            </li>
            <li className="list-inline-item px-0 px-sm-2">
              <Card.Link href="https://deckasoft.com" target="_blank">
                Blog
              </Card.Link>
            </li>
            <li className="list-inline-item px-0 px-sm-2">
              <Card.Link href="https://deckasoft.com" target="_blank">
                Contact
              </Card.Link>
            </li>
          </ul>
        </Col>
      </Row>
    </footer>
  );
};
export default FooterAdmin;
