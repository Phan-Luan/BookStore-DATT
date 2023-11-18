import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { commerce } from "./lib/commerce";
import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import ProductView from "./components/ProductView/ProductView";
import Footer from "./components/Footer/Footer";
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { getBooks } from "./services/book";
import SignIn from "./components/Auth/login";
import SignUp from "./components/Auth/register";
import { ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";
import Order from "./components/MyOrder/Order";

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const history = useHistory();

  const getProducts = async () => {
    const { data } = await getBooks();
    setProducts(data.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const user = sessionStorage.getItem("user");

  return (
    <div>
      <Router>
        <div >
          <CssBaseline />
          <Navbar
            totalItems={cart.total_items}
            handleDrawerToggle={handleDrawerToggle}
          />
          <Switch>
            <Route exact path="/">
              <Products products={products} />
            </Route>
            <Route exact path="/product/:id">
              <ProductView />
            </Route>
            <Route path="/login" exact>
              <SignIn />
            </Route>
            <Route path="/signup" exact>
              <SignUp />
            </Route>
            {user ? (
              <>
                <Route exact path="/cart">
                  <Cart />
                </Route>
                <Route exact path="/checkout">
                  <Checkout />
                </Route>
                <Route exact path="/myorder">
                  <Order />
                </Route>
              </>
            ) : (
              <Redirect to="/login" />
            )}
          </Switch>
        </div>
      </Router>
      <ToastContainer autoClose={2000} />
      <Footer />
    </div>
  );
};

export default App;
