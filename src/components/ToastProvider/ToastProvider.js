import React, { createContext, useState, useEffect } from "react";

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

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      setToasts([]);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <ToastContext.Provider value={{ dismissToast, createToast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
