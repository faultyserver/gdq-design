import * as React from "react";

import { Button, Card, Header, Spacer, Stack, Text } from "gdq-design";
import { ButtonVariantColor } from "../forms/Button";
import { ModalRenderProps } from "./Modal";

import styles from "./ConfirmModal.mod.css";

export interface ConfirmModalProps extends ModalRenderProps {
  title: React.ReactNode;
  body?: React.ReactNode;
  color?: ButtonVariantColor;
  confirmText?: React.ReactNode;
  cancelText?: React.ReactNode;
  onConfirm: () => unknown;
  onCancel?: () => unknown;
}

export function ConfirmModal(props: ConfirmModalProps) {
  const {
    title,
    body,
    color = "danger",
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    onClose,
  } = props;

  function handleConfirm() {
    onConfirm();
    onClose();
  }

  function handleCancel() {
    onCancel?.();
    onClose();
  }

  return (
    <Card level={1} className={styles.container}>
      <Stack spacing="space-lg">
        <Header tag="h2">{title}</Header>
        {body != null ? <Text>{body}</Text> : null}
        <Stack spacing="space-md" direction="reverse-horizontal">
          <Button variant={color} onClick={handleConfirm} autoFocus>
            {confirmText}
          </Button>
          {onCancel != null ? (
            <Button variant="link" onClick={handleCancel}>
              {cancelText}
            </Button>
          ) : null}
        </Stack>
      </Stack>
    </Card>
  );
}
