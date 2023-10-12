import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

function ToastShelf({ toastStack, handleDismiss }) {
  return (
    <ol className={styles.wrapper}>
      {toastStack.map(({ variant, id, message }) => (
        <li className={styles.toastWrapper} key={id}>
          <Toast variant={variant} handleDismiss={handleDismiss} id={id}>
            {message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
