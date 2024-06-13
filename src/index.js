import React from "react";
import ReactDOM from "react-dom";
import "assets/css/index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import "assets/css/App.css";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import reportWebVitals from "./reportWebVitals";
import { composeWithDevTools } from "redux-devtools-extension";
import Root from "routes";
import "tachyons";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { master } from "./store/reducers/combineReducer";

import { ToastContainer } from "react-toastify";

var stylesheet = document.styleSheets[0];
stylesheet.disabled = true;
stylesheet = document.styleSheets[1];
stylesheet.disabled = true;

const queryClient = new QueryClient();
const store = createStore(master, composeWithDevTools(applyMiddleware(thunk)));
ReactDOM.render(
  <GoogleOAuthProvider clientId="1040159173866-3kph0bsuiafar97rupres0tf15ghgbv7.apps.googleusercontent.com">
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <React.StrictMode>
          <Root />
          <ToastContainer />
        </React.StrictMode>
      </QueryClientProvider>
    </Provider>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
