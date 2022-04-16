import * as React from "react";
import {
  Accent,
  Button,
  Callout,
  Card,
  ConfirmModal,
  Header,
  openModal,
  Section,
  Stack,
  Text,
} from "gdq-design";

import usePageAccent from "../usePageAccent";
import PageHeader from "./PageHeader";

function ConfirmModalComponent() {
  function openConfirmModal() {
    openModal(
      (props) => (
        <ConfirmModal
          {...props}
          title="Hello"
          body="This is a confirm modal, with some body text as well. Pressing an action will log information to the console."
          onConfirm={() => console.log("hit the confirm button")}
          onCancel={() => console.log("hit the cancel button")}
        />
      ),
      { closeOnBackdrop: false },
    );
  }

  return (
    <Section>
      <Stack spacing="space-lg">
        <Header tag="h2">ConfirmModal</Header>
        <Text>
          <code>ConfirmModal</code> provides a simple, consistent way of getting user confirmation
          for an action. All that's required is a <code>title</code> and an <code>onConfirm</code>{" "}
          action, plus optional <code>body</code> text, an <code>onCancel</code> action, and color
          control.
        </Text>
        <Card>
          <Button variant="primary" onClick={openConfirmModal}>
            Open Confirm Modal
          </Button>
        </Card>
        <Text>
          To make sure that the user has to hit one of "Confirm" or "Cancel", pass the additional{" "}
          <code>closeOnBackdrop: false</code> option to <code>openModal</code>.
        </Text>
      </Stack>
    </Section>
  );
}

export default function Modals() {
  usePageAccent(Accent.BLUE);

  return (
    <Stack spacing="space-lg" align="stretch">
      <PageHeader name="Modals" tagline="Various components for modalized, layered content" />
      <ConfirmModalComponent />
    </Stack>
  );
}
