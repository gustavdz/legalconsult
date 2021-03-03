import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleBar from "simplebar-react";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBoxOpen,
  faChartPie,
  faCog,
  faFileAlt,
  faHandHoldingUsd,
  faSignOutAlt,
  faTimes,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  Badge,
  Image,
  Button,
  Dropdown,
  Accordion,
  Navbar,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import ThemesbergLogo from "../assets/img/themesberg.svg";
import ReactHero from "../assets/img/technologies/react-hero-logo.svg";
import ProfileDefault from "../assets/img/team/profile-picture-default.png";
import { logout } from "../actions/userActions";

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const onCollapse = () => setShow(!show);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button
            as={Nav.Link}
            className="d-flex justify-content-between align-items-center"
          >
            <span>
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">{children}</Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };
  const NavItem = (props) => {
    const {
      title,
      link,
      external,
      target,
      icon,
      image,
      badgeText,
      badgeBg = "secondary",
      badgeColor = "primary",
    } = props;
    const classNames = badgeText
      ? "d-flex justify-content-start align-items-center justify-content-between"
      : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? (
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
            ) : null}
            {image ? (
              <Image
                src={image}
                width={20}
                height={20}
                className="sidebar-icon svg-icon"
              />
            ) : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge
              pill
              bg={badgeBg}
              text={badgeColor}
              className="badge-md notification-count ms-2"
            >
              {badgeText}
            </Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      {userInfo && (
        <>
          <Navbar
            expand={false}
            collapseOnSelect
            variant="dark"
            className="navbar-theme-primary px-4 d-md-none"
          >
            <Navbar.Brand className="me-lg-5" as={Link} to="/home">
              <Image src={ReactHero} className="navbar-brand-light" />
            </Navbar.Brand>
            <Navbar.Toggle
              as={Button}
              aria-controls="main-navbar"
              onClick={onCollapse}
            >
              <span className="navbar-toggler-icon" />
            </Navbar.Toggle>
          </Navbar>
          <CSSTransition
            timeout={300}
            in={show}
            classNames="sidebar-transition"
          >
            <SimpleBar
              className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}
            >
              <div className="sidebar-inner px-4 pt-3">
                <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
                  <div className="d-flex align-items-center">
                    <div className="user-avatar lg-avatar me-4">
                      <Image
                        src={ProfileDefault}
                        className="card-img-top rounded-circle border-white"
                      />
                    </div>
                    <div className="d-block">
                      <h6>Hi, {userInfo.name}</h6>
                      <Button
                        as={Link}
                        variant="secondary"
                        size="xs"
                        to="/home"
                        onClick={logoutHandler}
                        className="text-dark"
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />{" "}
                        Logout
                      </Button>
                    </div>
                  </div>
                  <Nav.Link
                    className="collapse-close d-md-none"
                    onClick={onCollapse}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </Nav.Link>
                </div>
                <Nav className="flex-column pt-3 pt-md-0">
                  <NavItem title="Dashboard" link="/home" icon={faChartPie} />
                  {/* <NavItem title="Volt React" link="/home" image={ReactHero} /> */}
                  <NavItem
                    title="Mis Casos"
                    icon={faHandHoldingUsd}
                    link="/mycases"
                  />
                  <NavItem
                    title="Mis Clientes"
                    icon={faUserFriends}
                    link="/customers"
                  />
                  {/* <NavItem title="Settings" icon={faCog} link="/home" /> */}
                  {userInfo && userInfo.isAdmin && (
                    <CollapsableNavItem
                      eventKey="admin/"
                      title="Administración"
                      icon={faCog}
                    >
                      <NavItem title="Usuarios" link="/admin/userlist" />
                      <NavItem title="Casos" link="/admin/questionlist" />
                      <NavItem title="Productos" link="/admin/productlist" />
                      <NavItem title="Órdenes" link="/admin/orderlist" />
                    </CollapsableNavItem>
                  )}

                  <CollapsableNavItem
                    eventKey="examples/"
                    title="Page Examples"
                    icon={faFileAlt}
                  >
                    <NavItem title="Sign In" link="/home" />
                    <NavItem title="Sign Up" link="/home" />
                    <NavItem title="Forgot password" link="/home" />
                    <NavItem title="Reset password" link="/home" />
                    <NavItem title="Lock" link="/home" />
                    <NavItem title="404 Not Found" link="/home" />
                    <NavItem title="500 Server Error" link="/home" />
                  </CollapsableNavItem>

                  <NavItem
                    external
                    title="Plugins"
                    link="https://demo.themesberg.com/volt-pro-react/#/plugins/charts"
                    target="_blank"
                    badgeText="Pro"
                    icon={faChartPie}
                  />

                  <Dropdown.Divider className="my-3 border-indigo" />

                  <CollapsableNavItem
                    eventKey="documentation/"
                    title="Getting Started"
                    icon={faBook}
                  >
                    <NavItem title="Overview" link="/home" />
                    <NavItem title="Download" link="/home" />
                    <NavItem title="Quick Start" link="/home" />
                    <NavItem title="License" link="/home" />
                    <NavItem title="Folder Structure" link="/home" />
                    <NavItem title="Build Tools" link="/home" />
                    <NavItem title="Changelog" link="/home" />
                  </CollapsableNavItem>
                  <CollapsableNavItem
                    eventKey="components/"
                    title="Components"
                    icon={faBoxOpen}
                  >
                    <NavItem title="Accordion" link="/home" />
                    <NavItem title="Alerts" link="/home" />
                    <NavItem title="Badges" link="/home" />
                    <NavItem
                      external
                      title="Widgets"
                      link="https://demo.themesberg.com/volt-pro-react/#/components/widgets"
                      target="_blank"
                      badgeText="Pro"
                    />
                    <NavItem title="Breadcrumbs" link="/home" />
                    <NavItem title="Buttons" link="/home" />
                    <NavItem title="Forms" link="/home" />
                    <NavItem title="Modals" link="/home" />
                    <NavItem title="Navbars" link="/home" />
                    <NavItem title="Navs" link="/home" />
                    <NavItem title="Pagination" link="/home" />
                    <NavItem title="Popovers" link="/home" />
                    <NavItem title="Progress" link="/home" />
                    <NavItem title="Tables" link="/home" />
                    <NavItem title="Tabs" link="/home" />
                    <NavItem title="Toasts" link="/home" />
                    <NavItem title="Tooltips" link="/home" />
                  </CollapsableNavItem>
                  <NavItem
                    external
                    title="Themesberg"
                    link="https://themesberg.com"
                    target="_blank"
                    image={ThemesbergLogo}
                  />
                </Nav>
              </div>
            </SimpleBar>
          </CSSTransition>
        </>
      )}
    </>
  );
};

export default Sidebar;
