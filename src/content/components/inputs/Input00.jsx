import React from "react";
import styles from "./Input00.module.css";

const Input00 = ({ style = {}, ...props }) => {
  return <input className={styles.input} style={style} {...props} />;
};

export default Input00;
