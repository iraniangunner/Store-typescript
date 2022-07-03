import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./components/Signup";
import SignIn from "./components/Signin";
import NoPage from "./components/Nopage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import PasswordReset from "./components/PassReset";
import CreateProduct from "./components/Create";
import MarketPlace from "./components/Market";
import ProductPage from "./components/ProductDetail";
import ShoppingCart from "./components/ShoppingCart";
import { useState, useEffect } from "react";

function App() {
  const [quantity, setQuantity] = useState<number>(0);
  const [buttonStatus, setButtonStatus] = useState<string>("");
  const [cartProducts, setCartProducts] = useState([]);

  return (
    <div className="App dark:bg-gray-900 dark:text-gray-50">
      <Header
        quantity={quantity}
        setQuantity={setQuantity}
        buttonStatus={buttonStatus}
        setButtonStatus={setButtonStatus}
        cartProducts={cartProducts}
        setCartProducts={setCartProducts}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/market-place" element={<MarketPlace />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route
          path="/product-details/:id"
          element={
            <ProductPage
              quantity={quantity}
              setQuantity={setQuantity}
              buttonStatus={buttonStatus}
              setButtonStatus={setButtonStatus}
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
            />
          }
        />
        <Route path="/pass-reset" element={<PasswordReset />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
