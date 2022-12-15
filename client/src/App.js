import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Header } from "./components/Header";
import { CategoryPage } from "./pages/CategoryPage";
import { HomePage } from "./pages/HomePage";

function App() {
  
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/cat/:category" element={<CategoryPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
