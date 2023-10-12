import React, { useState } from "react";

import Button from "../Button";
import Toast from "../Toast";
import ToastShelf from "../ToastShelf";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState(VARIANT_OPTIONS[0]);
  const [toastStack, setToastStack] = useState([]);

  function handlePopToast(event) {
    event.preventDefault();

    const newToast = {
      id: crypto.randomUUID(),
      message,
      variant,
    };

    setToastStack([...toastStack, newToast]);

    setMessage("");

    setVariant(VARIANT_OPTIONS[0]);
  }

  function handleDismiss(id) {
    setToastStack(toastStack.filter((toast) => toast.id !== id));
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toastStack={toastStack} handleDismiss={handleDismiss} />

      <form onSubmit={handlePopToast}>
        <div className={styles.controlsWrapper}>
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: "baseline" }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea
                id="message"
                className={styles.messageInput}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              {VARIANT_OPTIONS.map((variantOption) => (
                <label htmlFor={`variant-${variantOption}`} key={variantOption}>
                  <input
                    id={`variant-${variantOption}`}
                    type="radio"
                    name="variant"
                    checked={variant === variantOption}
                    onChange={() => setVariant(variantOption)}
                  />
                  {variantOption}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label} />
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              <Button>Pop Toast!</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
