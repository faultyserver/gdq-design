import classNames from "classnames";
import * as React from "react";

import styles from "./Divider.mod.css";

export interface DividerProps {
  vertical?: boolean;
}

export function Divider(props: DividerProps) {
  const { vertical } = props;
  return (
    <div className={classNames(vertical ? styles.dividerVertical : styles.dividerHorizontal)}></div>
  );
}
