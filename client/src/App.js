import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Header } from "./components/Header";
import { Modal } from "./components/Modal/Modal";
import { CategoryPage } from "./pages/CategoryPage";
import { HomePage } from "./pages/HomePage";
import { OrderPage } from "./pages/OrderPage/OrderPage";

function App() {
  
  return (
    <div className="App">
      <Router>
        <Header/>
        <Modal/>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/cat/:category" element={<CategoryPage />} />
          <Route exact path="/order" element={<OrderPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
