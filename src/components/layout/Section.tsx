import * as React from "react";

import styles from "./Section.mod.css";

export function Section(props: { children: React.ReactNode }) {
  return <section className={styles.section}>{props.children}</section>;
}
