import React from "react";
import ReactDOM from "react-dom";

import SnackbarProvider from "./js/components/SnackbarProvider";
import TodoApp from "./js/components/TodoApp";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider>
      <TodoApp />
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
