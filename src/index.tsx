// import React from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App";
// import "./index.scss";
// import { Provider } from "react-redux";
// import { store } from "./redux/store";

import axios from "axios";

// const rootEl = document.querySelector("#root");

// if (!rootEl) throw new Error("Cannot find root element with that id");
// const root = createRoot(rootEl);

// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

axios
  .post("https://app.pre-screen.dev/job/1ed76338-5140-63a2-b50b-0d1c126d56ea", {
    name: "Glazunova Darya",
    email: "d.kochetygova@mail.ru",
    country: "Russia",
    city: "Moscow",
    message: "Hi! I will be glad to talk to you at the interview",
    github: "https://github.com/DaryaGlazunova",
    linkedin: "linkedin.com/in/дарья-глазунова-2b852b292",
  })
  .then(function (response) {
    console.log("suc!");
    console.log(response);
  })
  .catch(function (error) {
    console.log("errrrr", error);
  });
