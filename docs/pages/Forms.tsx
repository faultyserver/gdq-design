import * as React from "react";
import { Accent, Callout, Card, Header, Section, Stack, Text, TextInput } from "gdq-design";

import usePageAccent from "../usePageAccent";
import PageHeader from "./PageHeader";

function Introduction() {
  return (
    <Stack spacing="space-lg">
      <Text>
        Forms are the primary way that users interact on a page. Text inputs, switches, buttons,
        radio groups, and more all provide ways for a user to perform an action, change settings, or
        fill in information.
      </Text>
      <Text>
        GDQ's form system is built in two layers: Inputs and Controls. Inputs are low-level
        primitives that manage the user interaction, like <code>TextInput</code> and{" "}
        <code>Checkbox</code>. While these are styled to match the current theme, they are normally
        not meant to be used directly as they don't provide labels or other presentational features
        that most forms should have. Instead, Controls wrap around Inputs, and handle all of the
        presentational attributes, including labels, notes, prefixes and suffixes, errors, and more.
      </Text>
      <Text>
        The form system currently only provides the presentation layer for content and does not
        handle any state management. However, using standard props for values and action handlers
        make it easy to integrate any kind of state management (hooks, context or global state),
        just like using native elements.
      </Text>
      <Callout type="info">
        <Text>
          Future versions of this system will likely provide a hook-based interface for more quickly
          defining forms and their associated state.
        </Text>
      </Callout>
    </Stack>
  );
}

function TextInputComponent() {
  return (
    <Section>
      <Stack spacing="space-lg">
        <Header tag="h2">TextInput</Header>
        <Text>
          <code>TextInput</code> is the simplest text input, great for receiving short-form text
          from a user, such as a username, password, email address, or any other single-sentence
          content. TextInput also handles numeric inputs with the <code>type="number"</code> prop.
        </Text>
        <Card>
          <Stack spacing="space-md">
            <TextInput placeholder="Enter some text" />
            <TextInput type="password" placeholder="Password" />
            <TextInput type="number" defaultValue={0.0} />
          </Stack>
        </Card>
        <Text>
          <code>TextInput</code> is distinguished from other content using a thin border and a
          darkened interior.
        </Text>
        <Callout type="warning">
          <Text>
            While <code>TextInput</code> provides a <code>placeholder</code> prop for showing some
            hint text, placeholders <em>should not</em> use them for labeling the name of the input.
            Instead, use a <code>FormControl</code> with a <code>label</code> or <code>note</code>{" "}
            to provide context for the intent of the input. Placeholders are meant for showing
            example input only and should generally be avoided where not necessary.
          </Text>
        </Callout>
      </Stack>
    </Section>
  );
}

export default function Forms() {
  usePageAccent(Accent.PINK);

  return (
    <Stack spacing="space-lg" align="stretch">
      <PageHeader name="Forms" tagline="Get input from and provide options for users" />
      <Introduction />
      <TextInputComponent />
    </Stack>
  );
}
