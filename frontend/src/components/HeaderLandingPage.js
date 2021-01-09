import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userActions";
import { Link, animateScroll as scroll } from "react-scroll";

const HeaderLandingPage = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  const styles = {
    cursor: "pointer",
  };
  return (
    <header>
      <Navbar
        bg="light"
        variant="light"
        expand="lg"
        fixed="top"
        collapseOnSelect
        id="header"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>LegalConsult</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Link
                to="header"
                className="nav-link"
                style={styles}
                activeClass="active"
                onClick={scrollToTop}
                spy={true}
                smooth={true}
                duration={500}
              >
                Inicio
              </Link>

              <Link
                className="nav-link"
                style={styles}
                activeClass="active"
                to="about"
                spy={true}
                smooth={true}
                duration={500}
              >
                Nosotros
              </Link>

              <Link
                className="nav-link"
                style={styles}
                activeClass="active"
                to="services"
                spy={true}
                smooth={true}
                duration={500}
              >
                Servicios
              </Link>
              <Link
                className="nav-link"
                style={styles}
                activeClass="active"
                to="testimonials"
                spy={true}
                smooth={true}
                duration={500}
              >
                Testimonios
              </Link>
              <Link
                className="nav-link"
                style={styles}
                activeClass="active"
                to="team"
                spy={true}
                smooth={true}
                duration={500}
              >
                Equipo
              </Link>
              <Link
                className="nav-link"
                style={styles}
                activeClass="active"
                to="contact"
                spy={true}
                smooth={true}
                duration={500}
              >
                Contact
              </Link>
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Ingresar
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default HeaderLandingPage;
