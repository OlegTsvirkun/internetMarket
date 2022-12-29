import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Header } from "./components/Header";
import { Modal } from "./components/Modal/Modal";
import { SubHeader } from "./components/SubHeader";
import { CategoryPage } from "./pages/CategoryPage";
import { GoodItem } from "./pages/GoodItem/GoodItem";
import { HomePage } from "./pages/HomePage";
import { OrderPage } from "./pages/OrderPage/OrderPage";
import './App.css';
import { FinishOrder } from "./pages/FinishOrder/FinishOrder";

function App() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <div className="App">
      <Router>
        <Header/>
        <SubHeader searchValue = {searchValue} setSearchValue={setSearchValue}/>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/good" element={<GoodItem />} />
          <Route exact path="/cat/:category" element={<CategoryPage />} />
          <Route exact path="/order" element={<OrderPage />} />
          <Route exact path="/finish-order" element={<FinishOrder />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
