import React, { useRef } from "react";
import styles from "./Button00.module.css";

const Button00 = ({ children, onClick, style, disabled, loading }) => {
  const buttonRef = useRef(null);

  const handleClick = (e) => {
    const button = buttonRef.current;

    const circle = document.createElement("div");
    circle.className = styles.ripple;
    button.appendChild(circle);

    const rippleWidth = circle.offsetWidth;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    circle.style.left = `${x - rippleWidth / 2}px`;
    circle.style.top = `${y - rippleWidth / 2}px`;

    button.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 2000); // match animation duration

    onClick && onClick(e);
  };

  return (
    <button
      disabled={loading || disabled}
      ref={buttonRef}
      className={styles.button}
      onClick={handleClick}
      style={{ ...style }}
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

export default Button00;
