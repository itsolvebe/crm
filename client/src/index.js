// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
import "./index.css";

// import App from "./App";
// import { Provider } from "react-redux";
// // import store from "store";
// import React from "react";

// import userReducer from "./reducers/userReducer";
// import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// const rootReducer = combineReducers({
//   user: userReducer,
// });

// const store = legacy_createStore(
//   rootReducer,
//   // composeWithDevTools(),
//   applyMiddleware(thunk)
// );

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   // <React.StrictMode>
//   <BrowserRouter>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </BrowserRouter>
//   // </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
