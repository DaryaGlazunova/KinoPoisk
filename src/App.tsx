import React, { Suspense } from "react";

import Header from "./components/header/header";
import HomePage from "./pages/home/home";
import { Route, Routes, useLocation } from "react-router-dom";
import FilmPage from "./pages/film-details/film";
import AuthRootComponent from "./pages/auth";
import { useAuth } from "./hooks/use-auth";

const App = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div className="wrapper">
      <Header isLoggedIn={isLoggedIn} />
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
        <Route path="login" element={<AuthRootComponent />} />
        <Route path="register" element={<AuthRootComponent />} />
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
