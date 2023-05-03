import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import ability, { AbilityContext } from "./can";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AbilityContext.Provider value={ability}>
    <Provider store={store}>
      <App />{" "}
    </Provider>
  </AbilityContext.Provider>
);
