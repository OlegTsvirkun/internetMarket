import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import { Header } from "./components/Header";
import { Modal } from "./components/Modal/Modal";
import { SubHeader } from "./components/SubHeader";
import { CategoryPage } from "./pages/CategoryPage";
import { GoodItem } from "./pages/GoodItem/GoodItem";
import { HomePage } from "./pages/HomePage";
import { OrderPage } from "./pages/OrderPage/OrderPage";
import './App.css';
import { SearchPage } from "./pages/SearchPage/SearchPage";
import { Footer } from "./components/Footer/Footer";
import { FinishOrder } from "./pages/FinishOrder/FinishOrder";
import { Failpage } from "./pages/Failpage/Failpage";
import { AdminCreateGood } from "./pages/AdminCreateGood/AdminCreateGood";
import {  EditGoodPage } from "./pages/EditGoodPage/EditGoodPage";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { changeAuth, checkUser } from "./store/userSlice";
import { LOGIN_ROUTE } from "./utils/constRoutes";
import { ModalAlert } from "./components/ModalAlert/ModalAlert";


function App() {
  const {isAuth,isLoading,role} = useSelector(state=>state.user)
  const [isAlert, setIsAlert] = useState(false);
  // const [isAuth, setIsAuth] = useState(false);
  // const navigate = useNavigate()
  const dispatch = useDispatch()
  // console.log();
useEffect(() => {
  dispatch(checkUser())
}, []);
// ()=>navigate(LOGIN_ROUTE)
  // if(isLoading) return <>...Loading</> 

  return (
    <div className="App">
      <Router>
          <Header/>
          <SubHeader 
          // searchValue = {searchValue} setSearchValue={setSearchValue}
          />
      <div className="main">
        <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/good" element={<GoodItem />} />
            <Route exact path="/cat/:category" element={<CategoryPage />} />
            <Route exact path="/search" element={<SearchPage />} />
            <Route exact path="/order" element={<OrderPage />} />
            <Route exact path="/order/finish-order" element={<FinishOrder />} />
            <Route exact path="/user/registration" element={<AuthPage />} />
            <Route exact path="/user/login" element={<AuthPage />} />

         {role.includes("ADMIN") &&
         <><Route exact path="/admin" element={<AdminCreateGood />} /><Route exact path="/admin/edit-good" element={<EditGoodPage />} /></>
         
            }

            <Route path="*" element={<Failpage />} />
          </Routes>
          <Footer/>
      </div>
      
      </Router>
    </div>
  );
}

export default App;
