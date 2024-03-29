import * as React from "react";
import classNames from "classnames";

import Check from "gdq-design/icons/Check";
import Close from "gdq-design/icons/Close";
import InfoCircle from "gdq-design/icons/InfoCircle";
import ExclamationTriangle from "gdq-design/icons/ExclamationTriangle";
import ExclamationOctagon from "gdq-design/icons/ExclamationOctagon";

import styles from "./Callout.mod.css";
import { Clickable } from "./core/Clickable";

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
  onClose?: () => unknown;
}

export function Callout(props: CalloutProps) {
  const { type, children, className, onClose } = props;

  const Icon = getIcon(type);

  return (
    <div className={classNames(styles.callout, className, TYPE_CLASSES[type])}>
      <div className={styles.iconSidebar}>
        <Icon className={styles.icon} />
      </div>
      <div className={styles.content}>{children}</div>
      {onClose != null ? (
        <Clickable className={styles.dismissBar} onClick={onClose}>
          <Close className={styles.dismissIcon} />
        </Clickable>
      ) : null}
    </div>
  );
}
