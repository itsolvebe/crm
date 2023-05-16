// // store.js
// import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

// // Import your reducers
// import authReducer from "./reducers/authReducer";
// import userReducer from "./reducers/userReducer";

// // Combine reducers
// const rootReducer = combineReducers({
//   auth: authReducer,
//   user: userReducer,
// });

// // Create store
// const store = legacy_createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

// export default store;
