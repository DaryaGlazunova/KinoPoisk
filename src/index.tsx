import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.scss";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";

const rootEl = document.querySelector("#root");

if (!rootEl) throw new Error("Cannot find root element with that id");
const root = createRoot(rootEl);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
