import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import HeaderLandingPage from "./components/HeaderLandingPage";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import MyCasesScreen from "./screens/MyCasesScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import LandingPageScreen from "./screens/LandingPageScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import FooterLandingPage from "./components/FooterLandingPage";
import QuestionScreen from "./screens/QuestionScreen";
import QuestionListScreen from "./screens/QuestionListScreen";
import QuestionEditScreen from "./screens/QuestionEditScreen";
import Sidebar from "./components/Sidebar";
import Preloader from "./components/Preloader";
import FooterAdmin from "./components/FooterAdmin";
import NavbarAdmin from "./components/NavbarAdmin";

const App = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Switch>
        {/*Rutas para landing page*/}
        <Route path="/" exact>
          <HeaderLandingPage />
          <Switch>
            <Route path="/" component={LandingPageScreen} exact />
          </Switch>
          <FooterLandingPage />
        </Route>
        {/*Rutas para aplicacion*/}
        <Route path="/login">
          <Preloader show={loaded ? false : true} />
          <Route path="/login" component={LoginScreen} />
        </Route>
        <Route path="/register">
          <Preloader show={loaded ? false : true} />
          <Route path="/register" component={RegisterScreen} />
        </Route>
        <Route path="/:path?">
          <>
            <Preloader show={loaded ? false : true} />
            <Sidebar />
            <main className="content">
              {/* <Header /> */}
              <NavbarAdmin />
              <Container>
                <Switch>
                  <Route path="/profile" component={ProfileScreen} />
                  <Route path="/home" component={HomeScreen} exact />
                  <Route path="/question/:id" component={QuestionScreen} />
                  <Route path="/search/:keyword" component={HomeScreen} exact />
                  <Route
                    path="/page/:pageNumber"
                    component={HomeScreen}
                    exact
                  />
                  <Route
                    path="/search/:keyword/page/:pageNumber"
                    component={HomeScreen}
                    exact
                  />
                  <Route path="/admin/userlist" component={UserListScreen} />
                  <Route
                    path="/admin/user/:id/edit"
                    component={UserEditScreen}
                  />
                  <Route path="/shipping" component={ShippingScreen} />
                  <Route path="/payment" component={PaymentScreen} />
                  <Route path="/placeorder" component={PlaceOrderScreen} />
                  <Route path="/order/:id" component={OrderScreen} />
                  <Route path="/product/:id" component={ProductScreen} />
                  <Route path="/cart/:id?" component={CartScreen} />
                  <Route
                    path="/admin/productlist"
                    component={ProductListScreen}
                    exact
                  />
                  <Route
                    path="/admin/productlist/:pageNumber"
                    component={ProductListScreen}
                    exact
                  />
                  <Route
                    path="/admin/product/:id/edit"
                    component={ProductEditScreen}
                  />
                  <Route
                    path="/admin/questionlist"
                    component={QuestionListScreen}
                    exact
                  />
                  <Route
                    path="/admin/questionlist/:pageNumber"
                    component={QuestionListScreen}
                    exact
                  />
                  <Route path="/mycases" component={MyCasesScreen} exact />
                  <Route
                    path="/mycases/:pageNumber"
                    component={MyCasesScreen}
                    exact
                  />
                  <Route
                    path="/admin/question/:id/edit"
                    component={QuestionEditScreen}
                  />
                  <Route path="/admin/orderlist" component={OrderListScreen} />
                  <Route component={NotFoundScreen} />
                </Switch>
              </Container>
              <FooterAdmin />
            </main>
          </>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
