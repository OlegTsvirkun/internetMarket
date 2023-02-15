import { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import { Header } from "./components/Header Components/Header";
import { SubHeader } from "./components/Header Components/SubHeader/SubHeader";
import { HomePage } from "./pages/ShopPages/HomePage";
import { OrderPage } from "./pages/ShopPages/OrderPage/OrderPage";
import './App.css';
import { Footer } from "./components/Footer/Footer";
import { FinishOrder } from "./pages/ShopPages/FinishOrder/FinishOrder";
import { FailPage } from "./pages/FailPage/Failpage";
import {  AdminPage } from "./pages/AdminPage/AdminPage";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkUser } from "./store/slices/userSlice";
import { ADMIN_ROUTE, CATEGORY_ROUTE, FINISH_ORDER_ROUTE, GOOD_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, MANAGER_ROUTE, ORDER_ROUTE, REGISTRATION_ROUTE, SEARCH_ROUTE, USER_CABINET_ROUTE } from "./utils/constRoutes";
import { GoodsPage } from "./pages/ShopPages/GoodsPage/GoodsPage";
import { GoodItemPage } from "./pages/ShopPages/GoodItemPage/GoodItemPage";
import {  UserCabinetPage } from "./pages/UserCabinetPage/UserCabinetPage";
import { ManagerPanelPage } from "./pages/ManagerPanelPage/ManagerPanelPage";


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
        />
        <div className="main">
          <Routes>
            <Route exact path={MAIN_ROUTE} element={<HomePage />} />
            <Route exact path={GOOD_ROUTE} element={<GoodItemPage />} />
            <Route exact path={CATEGORY_ROUTE} element={<GoodsPage />} />
            <Route exact path={SEARCH_ROUTE} element={<GoodsPage />} />
            <Route exact path={ORDER_ROUTE} element={<OrderPage />} />
            <Route exact path={FINISH_ORDER_ROUTE} element={<FinishOrder />} />
            <Route exact path={REGISTRATION_ROUTE} element={<AuthPage />} />
            <Route exact path={LOGIN_ROUTE} element={<AuthPage />} />
            <Route exact path={USER_CABINET_ROUTE+'*'} element={<UserCabinetPage />} />
           
            <Route exact path={ADMIN_ROUTE+'*'} element={<AdminPage isLoading={isLoading} role ={role}/>} />
            <Route exact path={MANAGER_ROUTE+'*'} element={<ManagerPanelPage isLoading={isLoading} role ={role}/>} />
         

         { !isLoading &&  <Route path="*" element={<FailPage />} />}
          </Routes>
          <Footer />
        </div>

      </Router>
      
    </div>
  );
}

export default App;
