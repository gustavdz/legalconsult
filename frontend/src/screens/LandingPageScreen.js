import React from "react";
import { Carousel, Col, Row } from "react-bootstrap";
import Meta from "../components/Meta";
import IntroImg from "../assets/img/intro-img.svg";
import AboutImg from "../assets/img/about-img.svg";
import AboutExtra1 from "../assets/img/about-extra-1.svg";
import AboutExtra2 from "../assets/img/about-extra-2.svg";
import Testimonial1 from "../assets/img/testimonial-1.jpg";
import Testimonial2 from "../assets/img/testimonial-2.jpg";
import Testimonial3 from "../assets/img/testimonial-3.jpg";
import Testimonial4 from "../assets/img/testimonial-4.jpg";
import Testimonial5 from "../assets/img/testimonial-5.jpg";
import Team1 from "../assets/img/team-1.jpg";
import Team2 from "../assets/img/team-2.jpg";
import Team3 from "../assets/img/team-3.jpg";
import Team4 from "../assets/img/team-4.jpg";
import { Link as LinkScroll } from "react-scroll";
import { Link } from "react-router-dom";
import $ from "jquery";

const LandingPageScreen = () => {
  const styles = {
    cursor: "pointer",
  };

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });

  return (
    <>
      <Meta />
      {/*Top Banner*/}
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
              <Link to="/login" className="btn-get-started scrollto">
                Get Started
              </Link>

              <LinkScroll
                to="services"
                style={styles}
                spy={true}
                smooth={true}
                duration={500}
                className="btn-services scrollto"
              >
                Our Services
              </LinkScroll>
            </div>
          </div>
        </div>
      </section>
      <main id="main">
        {/* Contenido de nosotros */}
        <section id="about">
          <div className="container">
            <header className="section-header">
              <h3>About Us</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </header>

            <div className="row about-container">
              <div className="col-lg-6 content order-lg-1 order-2">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <div className="icon-box wow fadeInUp">
                  <div className="icon">
                    <i className="fa fa-shopping-bag"></i>
                  </div>
                  <h4 className="title">Eiusmod Tempor</h4>
                  <p className="description">
                    Et harum quidem rerum facilis est et expedita distinctio.
                    Nam libero tempore, cum soluta nobis est eligendi
                  </p>
                </div>

                <div className="icon-box wow fadeInUp" data-wow-delay="0.2s">
                  <div className="icon">
                    <i className="far fa-image"></i>
                  </div>
                  <h4 className="title">Magni Dolores</h4>
                  <p className="description">
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum
                  </p>
                </div>

                <div className="icon-box wow fadeInUp" data-wow-delay="0.4s">
                  <div className="icon">
                    <i className="fas fa-chart-bar"></i>
                  </div>
                  <h4 className="title">Dolor Sitema</h4>
                  <p className="description">
                    Minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat tarad limino ata
                  </p>
                </div>
              </div>

              <div className="col-lg-6 background order-lg-2 order-1 wow fadeInUp">
                <img src={AboutImg} className="img-fluid" alt="" />
              </div>
            </div>

            <div className="row about-extra">
              <div className="col-lg-6 wow fadeInUp">
                <img src={AboutExtra1} className="img-fluid" alt="" />
              </div>
              <div className="col-lg-6 wow fadeInUp pt-5 pt-lg-0">
                <h4>
                  Voluptatem dignissimos provident quasi corporis voluptates sit
                  assumenda.
                </h4>
                <p>
                  Ipsum in aspernatur ut possimus sint. Quia omnis est occaecati
                  possimus ea. Quas molestiae perspiciatis occaecati qui rerum.
                  Deleniti quod porro sed quisquam saepe. Numquam mollitia
                  recusandae non ad at et a.
                </p>
                <p>
                  Ad vitae recusandae odit possimus. Quaerat cum ipsum corrupti.
                  Odit qui asperiores ea corporis deserunt veritatis quidem
                  expedita perferendis. Qui rerum eligendi ex doloribus quia
                  sit. Porro rerum eum eum.
                </p>
              </div>
            </div>

            <div className="row about-extra">
              <div className="col-lg-6 wow fadeInUp order-1 order-lg-2">
                <img src={AboutExtra2} className="img-fluid" alt="" />
              </div>

              <div className="col-lg-6 wow fadeInUp pt-4 pt-lg-0 order-2 order-lg-1">
                <h4>
                  Neque saepe temporibus repellat ea ipsum et. Id vel et quia
                  tempora facere reprehenderit.
                </h4>
                <p>
                  Delectus alias ut incidunt delectus nam placeat in
                  consequatur. Sed cupiditate quia ea quis. Voluptas nemo qui
                  aut distinctio. Cumque fugit earum est quam officiis numquam.
                  Ducimus corporis autem at blanditiis beatae incidunt sunt.
                </p>
                <p>
                  Voluptas saepe natus quidem blanditiis. Non sunt impedit
                  voluptas mollitia beatae. Qui esse molestias. Laudantium
                  libero nisi vitae debitis. Dolorem cupiditate est perferendis
                  iusto.
                </p>
                <p>
                  Eum quia in. Magni quas ipsum a. Quis ex voluptatem inventore
                  sint quia modi. Numquam est aut fuga mollitia exercitationem
                  nam accusantium provident quia.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Contenido de servicios */}
        <section id="services" className="section-bg">
          <div className="container">
            <header className="section-header">
              <h3>Services</h3>
              <p>
                Laudem latine persequeris id sed, ex fabulas delectus quo. No
                vel partiendo abhorreant vituperatoribus.
              </p>
            </header>

            <div className="row">
              <div
                className="col-md-6 col-lg-5 offset-lg-1 wow bounceInUp"
                data-wow-duration="1.4s"
              >
                <div className="box">
                  <div className="icon">
                    <i
                      className="ion-ios-analytics-outline"
                      style={{ color: "#ff689b" }}
                    ></i>
                  </div>
                  <h4 className="title">Lorem Ipsum</h4>
                  <p className="description">
                    Voluptatum deleniti atque corrupti quos dolores et quas
                    molestias excepturi sint occaecati cupiditate non provident
                  </p>
                </div>
              </div>
              <div
                className="col-md-6 col-lg-5 wow bounceInUp"
                data-wow-duration="1.4s"
              >
                <div className="box">
                  <div className="icon">
                    <i
                      className="ion-ios-bookmarks-outline"
                      style={{ color: "#e9bf06" }}
                    ></i>
                  </div>
                  <h4 className="title">Dolor Sitema</h4>
                  <p className="description">
                    Minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat tarad limino ata
                  </p>
                </div>
              </div>

              <div
                className="col-md-6 col-lg-5 offset-lg-1 wow bounceInUp"
                data-wow-delay="0.1s"
                data-wow-duration="1.4s"
              >
                <div className="box">
                  <div className="icon">
                    <i
                      className="ion-ios-paper-outline"
                      style={{ color: "#3fcdc7" }}
                    ></i>
                  </div>
                  <h4 className="title">Sed ut perspiciatis</h4>
                  <p className="description">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur
                  </p>
                </div>
              </div>
              <div
                className="col-md-6 col-lg-5 wow bounceInUp"
                data-wow-delay="0.1s"
                data-wow-duration="1.4s"
              >
                <div className="box">
                  <div className="icon">
                    <i
                      className="ion-ios-speedometer-outline"
                      style={{ color: "#41cf2e" }}
                    ></i>
                  </div>
                  <h4 className="title">Magni Dolores</h4>
                  <p className="description">
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum
                  </p>
                </div>
              </div>

              <div
                className="col-md-6 col-lg-5 offset-lg-1 wow bounceInUp"
                data-wow-delay="0.2s"
                data-wow-duration="1.4s"
              >
                <div className="box">
                  <div className="icon">
                    <i
                      className="ion-ios-world-outline"
                      style={{ color: "#d6ff22" }}
                    ></i>
                  </div>
                  <h4 className="title">Nemo Enim</h4>
                  <p className="description">
                    At vero eos et accusamus et iusto odio dignissimos ducimus
                    qui blanditiis praesentium voluptatum deleniti atque
                  </p>
                </div>
              </div>
              <div
                className="col-md-6 col-lg-5 wow bounceInUp"
                data-wow-delay="0.2s"
                data-wow-duration="1.4s"
              >
                <div className="box">
                  <div className="icon">
                    <i
                      className="ion-ios-clock-outline"
                      style={{ color: "#4680ff" }}
                    ></i>
                  </div>
                  <h4 className="title">Eiusmod Tempor</h4>
                  <p className="description">
                    Et harum quidem rerum facilis est et expedita distinctio.
                    Nam libero tempore, cum soluta nobis est eligendi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Contenido de why-us */}
        <section id="why-us" className="wow fadeIn">
          <div className="container">
            <header className="section-header">
              <h3>Why choose us?</h3>
              <p>
                Laudem latine persequeris id sed, ex fabulas delectus quo. No
                vel partiendo abhorreant vituperatoribus.
              </p>
            </header>

            <div className="row row-eq-height justify-content-center">
              <div className="col-lg-4 mb-4">
                <div className="card wow bounceInUp">
                  <i className="far fa-gem"></i>
                  <div className="card-body">
                    <h5 className="card-title">Corporis dolorem</h5>
                    <p className="card-text">
                      Deleniti optio et nisi dolorem debitis. Aliquam nobis est
                      temporibus sunt ab inventore officiis aut voluptatibus.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 mb-4">
                <div className="card wow bounceInUp">
                  <i className="fas fa-language"></i>
                  <div className="card-body">
                    <h5 className="card-title">Voluptates dolores</h5>
                    <p className="card-text">
                      Voluptates nihil et quis omnis et eaque omnis sint aut.
                      Ducimus dolorum aspernatur.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 mb-4">
                <div className="card wow bounceInUp">
                  <i className="far fa-object-group"></i>
                  <div className="card-body">
                    <h5 className="card-title">Eum ut aspernatur</h5>
                    <p className="card-text">
                      Autem quod nesciunt eos ea aut amet laboriosam ab. Eos
                      quis porro in non nemo ex.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row counters">
              <div className="col-lg-3 col-6 text-center">
                <span data-toggle="counter-up">274</span>
                <p>Clients</p>
              </div>

              <div className="col-lg-3 col-6 text-center">
                <span data-toggle="counter-up">421</span>
                <p>Projects</p>
              </div>

              <div className="col-lg-3 col-6 text-center">
                <span data-toggle="counter-up">1,364</span>
                <p>Hours Of Support</p>
              </div>

              <div className="col-lg-3 col-6 text-center">
                <span data-toggle="counter-up">18</span>
                <p>Hard Workers</p>
              </div>
            </div>
          </div>
        </section>
        {/* Contenido de testimonials */}
        <section id="testimonials" className="section-bg">
          <div className="container">
            <header className="section-header">
              <h3>Testimonials</h3>
            </header>

            <div className="row justify-content-center">
              <div className="col-sm-10">
                <div className="my__carousel_main">
                  <Carousel controls={false} indicators={true}>
                    <Carousel.Item className="testimonial-item">
                      <Row>
                        <Col xs={12} md={12} lg={2} className="text-center">
                          <img
                            src={Testimonial1}
                            className="testimonial-img"
                            alt=""
                          />
                        </Col>
                        <Col xs={12} md={12} lg={10}>
                          <Carousel.Caption>
                            <h3>Saul Goodman</h3>
                            <h4>Ceo &amp; Founder</h4>
                            <p>
                              Proin iaculis purus consequat sem cure digni ssim
                              donec porttitora entum suscipit rhoncus.
                              Accusantium quam, ultricies eget id, aliquam eget
                              nibh et. Maecen aliquam, risus at semper.
                            </p>
                          </Carousel.Caption>
                        </Col>
                      </Row>
                    </Carousel.Item>
                    <Carousel.Item className="testimonial-item">
                      <Row>
                        <Col xs={12} md={12} lg={2} className="text-center">
                          <img
                            src={Testimonial2}
                            className="testimonial-img"
                            alt=""
                          />
                        </Col>
                        <Col xs={12} md={12} lg={10}>
                          <Carousel.Caption>
                            <h3>Sara Wilsson</h3>
                            <h4>Designer</h4>
                            <p>
                              Export tempor illum tamen malis malis eram quae
                              irure esse labore quem cillum quid cillum eram
                              malis quorum velit fore eram velit sunt aliqua
                              noster fugiat irure amet legam anim culpa.
                            </p>
                          </Carousel.Caption>
                        </Col>
                      </Row>
                    </Carousel.Item>
                    <Carousel.Item className="testimonial-item">
                      <Row>
                        <Col xs={12} md={12} lg={2} className="text-center">
                          <img
                            src={Testimonial3}
                            className="testimonial-img"
                            alt=""
                          />
                        </Col>
                        <Col xs={12} md={12} lg={10}>
                          <Carousel.Caption>
                            <h3>Jena Karlis</h3>
                            <h4>Store Owner</h4>
                            <p>
                              Enim nisi quem export duis labore cillum quae
                              magna enim sint quorum nulla quem veniam duis
                              minim tempor labore quem eram duis noster aute
                              amet eram fore quis sint minim.
                            </p>
                          </Carousel.Caption>
                        </Col>
                      </Row>
                    </Carousel.Item>
                    <Carousel.Item className="testimonial-item">
                      <Row>
                        <Col xs={12} md={12} lg={2} className="text-center">
                          <img
                            src={Testimonial4}
                            className="testimonial-img"
                            alt=""
                          />
                        </Col>
                        <Col xs={12} md={12} lg={10}>
                          <Carousel.Caption>
                            <h3>Matt Brandon</h3>
                            <h4>Freelancer</h4>
                            <p>
                              Fugiat enim eram quae cillum dolore dolor amet
                              nulla culpa multos export minim fugiat minim velit
                              minim dolor enim duis veniam ipsum anim magna sunt
                              elit fore quem dolore labore illum veniam.
                            </p>
                          </Carousel.Caption>
                        </Col>
                      </Row>
                    </Carousel.Item>
                    <Carousel.Item className="testimonial-item">
                      <Row>
                        <Col xs={12} md={12} lg={2} className="text-center">
                          <img
                            src={Testimonial5}
                            className="testimonial-img"
                            alt=""
                          />
                        </Col>
                        <Col xs={12} md={12} lg={10}>
                          <Carousel.Caption>
                            <h3>John Larson</h3>
                            <h4>Entrepreneur</h4>
                            <p>
                              Quis quorum aliqua sint quem legam fore sunt eram
                              irure aliqua veniam tempor noster veniam enim
                              culpa labore duis sunt culpa nulla illum cillum
                              fugiat legam esse veniam culpa fore nisi cillum
                              quid.
                            </p>
                          </Carousel.Caption>
                        </Col>
                      </Row>
                    </Carousel.Item>
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Contenido de team */}
        <section id="team">
          <div className="container">
            <div className="section-header">
              <h3>Team</h3>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque
              </p>
            </div>

            <div className="row">
              <div className="col-lg-3 col-md-6 wow fadeInUp">
                <div className="member">
                  <img src={Team1} className="img-fluid" alt="" />
                  <div className="member-info">
                    <div className="member-info-content">
                      <h4>Walter White</h4>
                      <span>Chief Executive Officer</span>
                      <div className="social">
                        <a
                          href="https://twitter.com"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a
                          href="https://facebook.com"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a
                          href="https://linkedin.com"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="member">
                  <img src={Team2} className="img-fluid" alt="" />
                  <div className="member-info">
                    <div className="member-info-content">
                      <h4>Sarah Jhonson</h4>
                      <span>Product Manager</span>
                      <div className="social">
                        <a
                          href="https://twitter.com"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a
                          href="https://facebook.com"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a
                          href="https://linkedin.com"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6 wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <div className="member">
                  <img src={Team3} className="img-fluid" alt="" />
                  <div className="member-info">
                    <div className="member-info-content">
                      <h4>William Anderson</h4>
                      <span>CTO</span>
                      <div className="social">
                        <a
                          href="https://twitter.com"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a
                          href="https://facebook.com"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a
                          href="https://linkedin.com"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6 wow fadeInUp"
                data-wow-delay="0.3s"
              >
                <div className="member">
                  <img src={Team4} className="img-fluid" alt="" />
                  <div className="member-info">
                    <div className="member-info-content">
                      <h4>Amanda Jepson</h4>
                      <span>Accountant</span>
                      <div className="social">
                        <a
                          href="https://twitter.com"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a
                          href="https://facebook.com"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a
                          href="https://linkedin.com"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <LinkScroll
        to="intro"
        style={styles}
        spy={true}
        smooth={true}
        duration={500}
        className="back-to-top"
      >
        <i className="fas fa-chevron-up"></i>
      </LinkScroll>
    </>
  );
};

export default LandingPageScreen;
