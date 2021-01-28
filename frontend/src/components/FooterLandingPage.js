import React from "react";
import { Form, Button } from "react-bootstrap";
const FooterLandingPage = () => {
  const year = new Date();
  const heartStyle = { color: "#be1931" };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitted subscribe");
  };
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 footer-info">
              <h4>LegalConsult</h4>
              <p>
                Cras fermentum odio eu feugiat lide par naso tierra. Justo eget
                nada terra videa magna derita valies darta donna mare fermentum
                iaculis eu non diam phasellus. Scelerisque felis imperdiet proin
                fermentum leo. Amet volutpat consequat mauris nunc congue.
              </p>
            </div>

            <div className="col-lg-4 col-md-6 footer-contact">
              <h4>Contact Us</h4>
              <p>
                A108 Adam Street <br />
                New York, NY 535022
                <br />
                United States <br />
                <strong>Phone:</strong> +1 5589 55488 55
                <br />
                <strong>Email:</strong> info@example.com
                <br />
              </p>

              <div className="social-links">
                <a href="https://twitter.com" className="twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://facebook.com" className="facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://instagram.com" className="instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://linkedin.com" className="linkedin">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 footer-newsletter">
              <h4>Our Newsletter</h4>
              <p>
                Tamen quem nulla quae legam multos aute sint culpa legam noster
                magna veniam enim veniam illum dolore legam minim quorum culpa
                amet magna export quem marada parida nodela caramase seza.
              </p>
              <Form onSubmit={submitHandler}>
                <input type="email" name="email" />
                <Button type="submit">Subscribe</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright">
          <b>LexiConsultas</b> &copy; {year.getFullYear()}. All Rights Reserved.
        </div>
        <div className="credits">
          Made with{" "}
          <i className="fa fa-heart" aria-hidden="true" style={heartStyle}></i>{" "}
          by{" "}
          <a href="https://www.deckasoft.com" target="_blank" rel="noreferrer">
            Deckasoft
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterLandingPage;
