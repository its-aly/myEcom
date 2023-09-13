import { useSelector } from "react-redux";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Signup from "./pages/Signup";

//in new version Redirect is replace by Navigate
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// cchecking if user is logged in or not
const App = () => {
  const isUserLoggedIn = useSelector((state) => state.user.currentUser);
  return (
    <div>
      {/* used for adding App routers to brower url */}
      <BrowserRouter>
        <Routes>
          {/* in new version pages are passed in element  */}
          <Route exact path="/" element={<Home></Home>} />
          <Route path="/product/:id" element={<Product></Product>} />
          <Route path="/productlist/" element={<ProductList></ProductList>} />
          <Route
            path="/productlist/:category"
            element={<ProductList></ProductList>}
          />
          <Route
            path="/login"
            element={isUserLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/signup" element={<Signup></Signup>} />
          <Route path="/cart" element={<Cart></Cart>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
