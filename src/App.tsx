import React, { Suspense } from "react";

import Header from "./components/header/header";
import HomePage from "./pages/home/home";
import { Route, Routes } from "react-router-dom";
import FilmPage from "./pages/film/film";

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Идёт загрузка фильмов...</div>}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="film/:id"
          element={
            <Suspense
              fallback={<div>Идёт загрузка информации о фильме...</div>}
            >
              <FilmPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
              <div>Страница не найдена</div>
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
