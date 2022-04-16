import * as React from "react";
import * as uuid from "uuid";

import { Modal, createLayer } from "gdq-design";
import { ModalProps, ModalRenderProps } from "./Modal";

export function openModal(
  render: (props: ModalRenderProps) => React.ReactNode,
  options: Omit<ModalProps, "name" | "render"> = {},
): string {
  const name = uuid.v4();

  createLayer({
    name,
    render: () => <Modal {...options} name={name} render={(props) => render(props)} />,
  });

  return name;
}
