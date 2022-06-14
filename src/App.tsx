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


function App() {
  return (
    <div className="App dark:bg-gray-900 dark:text-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/create" element={<CreateProduct />}/>
        <Route path="/market-place" element={<MarketPlace />} />
        <Route path="/product-details/:id" element={<ProductPage />} />
        <Route path="/pass-reset" element={<PasswordReset />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
