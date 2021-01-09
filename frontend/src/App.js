import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import HeaderLandingPage from "./components/HeaderLandingPage";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
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

const App = () => {
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
        <Route path="/:path?">
          <Header />
          <main className="py-3">
            <Container>
              <Switch>
                <Route path="/admin/userlist" component={UserListScreen} />
                <Route path="/admin/user/:id/edit" component={UserEditScreen} />
                <Route path="/login" component={LoginScreen} />
                <Route path="/register" component={RegisterScreen} />
                <Route path="/profile" component={ProfileScreen} />
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
                <Route path="/admin/orderlist" component={OrderListScreen} />
                <Route path="/search/:keyword" component={HomeScreen} exact />
                <Route path="/page/:pageNumber" component={HomeScreen} exact />
                <Route
                  path="/search/:keyword/page/:pageNumber"
                  component={HomeScreen}
                  exact
                />
                <Route path="/home" component={HomeScreen} exact />
                <Route component={NotFoundScreen} />
              </Switch>
            </Container>
          </main>
          <Footer />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
