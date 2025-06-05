import React from "react";
import styles from "./LoadingButton00.module.css";

const LoadingButton00 = ({ loading, children, onClick, disabled }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {children}
      {loading && (
        <span className={styles.dots}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </span>
      )}
    </button>
  );
};

export default LoadingButton00;
