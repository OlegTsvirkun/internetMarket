import { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import { Header } from "./components/Header Components/Header";
import { SubHeader } from "./components/Header Components/SubHeader/SubHeader";
import { HomePage } from "./pages/ShopPages/HomePage";
import { OrderPage } from "./pages/ShopPages/OrderPage/OrderPage";
import './App.css';
// import { SearchPage } from "./pages/ShopPages/(__SearchPage)/SearchPage";
import { Footer } from "./components/Footer/Footer";
import { FinishOrder } from "./pages/ShopPages/FinishOrder/FinishOrder";
import { FailPage } from "./pages/FailPage/Failpage";
import {  AdminPage } from "./pages/AdminPages/AdminPage/AdminPage";
// import { EditGoodPage } from "./pages/AdminPages/EditGoodPage/EditGoodPage";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkUser } from "./store/userSlice";
import { CATEGORY_ROUTE, CREATE_CATEGORY_ROUTE, CREATE_GOOD_ROUTE, FINISH_ORDER_ROUTE, GOOD_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, ORDER_ROUTE, REGISTRATION_ROUTE, SEARCH_ROUTE } from "./utils/constRoutes";
import { GoodsPage } from "./pages/ShopPages/GoodsPage";
import { GoodItemPage } from "./pages/ShopPages/GoodItemPage/GoodItemPage";
import { ModalBackground } from "./components/AdditionalComponents/ModalBackground/ModalBackground";


function App() {
  const cart = useSelector((state) => state.cart.itemsInCart);
  const { isAuth, isLoading, role } = useSelector(state => state.user)
  const [isAlert, setIsAlert] = useState(false);
  const isCartMounted = useRef(false);


  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) return
    dispatch(checkUser())
      .then(res => {
        if (res.error) localStorage.removeItem('token');
      })
  }, []);
  useEffect(() => {
    if (isCartMounted.current) {
      let json = JSON.stringify(cart);
      localStorage.setItem("cart", json);
    }
    isCartMounted.current = true;
  }, [cart]);


  return (
    <div className="App">
      <Router>
        <Header />
        <SubHeader
        // searchValue = {searchValue} setSearchValue={setSearchValue}
        />
        <div className="main">
          <Routes>
            <Route exact path={MAIN_ROUTE} element={<HomePage />} />
            <Route exact path={GOOD_ROUTE} element={<GoodItemPage />} />
            <Route exact path={CATEGORY_ROUTE} element={<GoodsPage />} />
            <Route exact path={SEARCH_ROUTE} element={<GoodsPage />} />
            {/* <Route exact path={SEARCH_ROUTE} element={<SearchPage />} /> */}
            <Route exact path={ORDER_ROUTE} element={<OrderPage />} />
            <Route exact path={FINISH_ORDER_ROUTE} element={<FinishOrder />} />
            <Route exact path={REGISTRATION_ROUTE} element={<AuthPage />} />
            <Route exact path={LOGIN_ROUTE} element={<AuthPage />} />
           
            <Route exact path="/admin/*" element={<AdminPage isLoading={isLoading} role ={role}/>} />
         

         { !isLoading &&  <Route path="*" element={<FailPage />} />}
          </Routes>
          <Footer />
        </div>

      </Router>
      
    </div>
  );
}

export default App;
