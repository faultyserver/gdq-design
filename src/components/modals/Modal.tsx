import * as React from "react";
import { removeLayer } from "../layers/LayersStore";

import styles from "./Modal.mod.css";

export interface ModalRenderProps {
  onClose: () => unknown;
}

export interface ModalProps {
  name: string;
  render: (props: ModalRenderProps) => React.ReactNode;
  closeOnBackdrop?: boolean;
}

export function Modal(props: ModalProps) {
  const { name, render, closeOnBackdrop = true } = props;
  const contentRef = React.useRef<HTMLDivElement>(null);

  function handleClose() {
    removeLayer(name);
  }

  function handleContainerClick(event: React.MouseEvent<HTMLElement>) {
    const content = contentRef.current;
    if (content == null) return;

    if (content.contains(event.target as HTMLElement)) return;

    handleClose();
  }

  return (
    <div className={styles.container} onClick={closeOnBackdrop ? handleContainerClick : undefined}>
      <div ref={contentRef} className={styles.positioner}>
        {render({ onClose: handleClose })}
      </div>
    </div>
  );
}
