import React, { useState, useCallback, useRef } from "react";

import SnackbarContext from "../contexts/snackbarContext";

const SnackbarProvider = ({ children }) => {
  const [snackBarState, setSnackbarState] = useState({ show: false, message: undefined });

  const timeoutId = useRef();

  const showSnackbar = useCallback((message) => {
    clearTimeout(timeoutId.current);
    setSnackbarState({ show: true, message });
    timeoutId.current = setTimeout(() => {
      setSnackbarState({ show: false, message: undefined });
    }, 3000);
  }, []);

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      {snackBarState.show && <div className="snackbar">{snackBarState.message}</div>}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
