import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store/store";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";

import { LogService } from "./services/LogService";
import { StoreService } from "./services/StoreService";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import "./App.css";

library.add(fas);

function App() {
  useEffect(() => {
    LogService.getAllLogs().then((data) => {
      StoreService.hydrateStore(data);
    });
  }, []);

  return (
    <Provider store={store}>
      <NavBar />
      <HomePage />
    </Provider>
  );
}

export default App;
