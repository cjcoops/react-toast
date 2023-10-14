import React, { createContext, useCallback, useState } from "react";
import useKeydown from "../../hooks/useKeydown";

export const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function createToast(message, variant) {
    const newToast = {
      id: crypto.randomUUID(),
      message,
      variant,
    };

    setToasts([...toasts, newToast]);
  }

  function dismissToast(id) {
    setToasts(toasts.filter((toast) => toast.id !== id));
  }

  // Here we are memoizing the callback function so that it is only created once
  // and each additional re-render of this component doesn't cause a new function to be created.
  // This is important because we are passing this function as a dependency to the useKeydown
  // hook which would cause the effect to re-execute every time this component re-renders.
  const handleEscape = useCallback(() => {
    setToasts([]);
  }, []);

  useKeydown("Escape", handleEscape);

  return (
    <ToastContext.Provider value={{ dismissToast, createToast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
