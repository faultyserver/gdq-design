import * as React from "react";
import classNames from "classnames";

import styles from "./Callout.mod.css";
import Check from "gdq-design/icons/Check";
import InfoCircle from "gdq-design/icons/InfoCircle";
import ExclamationTriangle from "gdq-design/icons/ExclamationTriangle";
import ExclamationOctagon from "gdq-design/icons/ExclamationOctagon";

export type CalloutType = "success" | "info" | "warning" | "danger";

const TYPE_CLASSES = {
  success: styles.typeSuccess,
  info: styles.typeInfo,
  warning: styles.typeWarning,
  danger: styles.typeDanger,
};

function getIcon(type: CalloutType) {
  switch (type) {
    case "success":
      return Check;
    case "info":
      return InfoCircle;
    case "warning":
      return ExclamationTriangle;
    case "danger":
      return ExclamationOctagon;
  }
}

export interface CalloutProps {
  type: CalloutType;
  children: React.ReactNode;
  className?: string;
}

export function Callout(props: CalloutProps) {
  const { type, children, className } = props;

  const Icon = getIcon(type);

  return (
    <div className={classNames(styles.callout, className, TYPE_CLASSES[type])}>
      <div className={styles.iconSidebar}>
        <Icon className={styles.icon} />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
