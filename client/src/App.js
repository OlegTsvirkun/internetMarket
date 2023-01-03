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
import { SearchPage } from "./pages/SearchPage/SearchPage";
import { Footer } from "./components/Footer/Footer";

function App() {
  // const [searchValue, setSearchValue] = useState('');
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
            <Route exact path="/order" element={<OrderPage />} />
            <Route exact path="/search" element={<SearchPage />} />
          </Routes>
          <Footer/>
      </div>
      </Router>
    </div>
  );
}

export default App;
