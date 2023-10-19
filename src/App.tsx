import React from "react";

import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/header";
import HomePage from "./pages/home";

const App = () => {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <HomePage />
      </div>
    </BrowserRouter>
  );
};

export default App;
