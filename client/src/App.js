import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import { Header } from "./components/Header";
import { Modal } from "./components/Modal/Modal";
import { SubHeader } from "./components/SubHeader";
import { CategoryPage } from "./pages/ShopPages/CategoryPage";
import { GoodItem } from "./pages/ShopPages/GoodItem/GoodItem";
import { HomePage } from "./pages/ShopPages/HomePage";
import { OrderPage } from "./pages/ShopPages/OrderPage/OrderPage";
import './App.css';
import { SearchPage } from "./pages/ShopPages/SearchPage/SearchPage";
import { Footer } from "./components/Footer/Footer";
import { FinishOrder } from "./pages/FinishOrder/FinishOrder";
import { FailPage} from "./pages/FailPage/FailPage";
import { AdminCreateGood, AdminPage } from "./pages/AdminPages/AdminPage/AdminPage";
import {  EditGoodPage } from "./pages/AdminPages/EditGoodPage/EditGoodPage";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { changeAuth, checkUser } from "./store/userSlice";
import { CATEGORY_ROUTE, CREATE_CATEGORY_ROUTE, CREATE_GOOD_ROUTE, FINISH_ORDER_ROUTE, GOOD_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, ORDER_ROUTE, REGISTRATION_ROUTE, SEARCH_ROUTE } from "./utils/constRoutes";
import { ModalAlert } from "./components/ModalAlert/ModalAlert";
import { CreateCategoryPage } from "./pages/AdminPages/CreateCategoryPage/CreateCategoryPage";
import { CreateGoodPage } from "./pages/AdminPages/CreateGoodPage/CreateGoodPage";


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
            <Route exact path={MAIN_ROUTE} element={<HomePage />} />
            <Route exact path={GOOD_ROUTE} element={<GoodItem />} />
            <Route exact path={CATEGORY_ROUTE} element={<CategoryPage />} />
            <Route exact path={SEARCH_ROUTE} element={<SearchPage />} />
            <Route exact path={ORDER_ROUTE} element={<OrderPage />} />
            <Route exact path={FINISH_ORDER_ROUTE} element={<FinishOrder />} />
            <Route exact path={REGISTRATION_ROUTE} element={<AuthPage />} />
            <Route exact path={LOGIN_ROUTE} element={<AuthPage />} />

         {role.includes("ADMIN") &&
         <><Route exact path="/admin" element={<AdminPage />} />
         <Route exact path="/admin/edit-good" element={<EditGoodPage />} />
         <Route exact path={CREATE_CATEGORY_ROUTE} element={<CreateCategoryPage />} />
         <Route exact path={CREATE_GOOD_ROUTE} element={<CreateGoodPage />} />
         
         </>
         
            }

            <Route path="*" element={<FailPage />} />
          </Routes>
          <Footer/>
      </div>
      
      </Router>
    </div>
  );
}

export default App;
