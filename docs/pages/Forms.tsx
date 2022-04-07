import * as React from "react";
import {
  Accent,
  Button,
  Callout,
  Card,
  Checkbox,
  FormControl,
  FormSwitch,
  Header,
  RadioGroup,
  Section,
  Stack,
  Text,
  TextInput,
  Theme,
  ThemeContext,
} from "gdq-design";

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
          defining forms and their associated state in a single step.
        </Text>
      </Callout>
    </Stack>
  );
}

function Example() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Section>
      <Stack spacing="space-lg">
        <Header tag="h2">Example</Header>
        <Card>
          <Stack spacing="space-lg">
            <FormControl label="Username">
              <TextInput placeholder="gdqmonitor" />
            </FormControl>
            <FormControl
              label="Password"
              note="Pick something secure. Or better yet, use a password manager."
            >
              <TextInput type="password" />
            </FormControl>
            <FormSwitch
              label="Give something to me"
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
              note="Selecting this will give something to the monitor"
            />
            <Stack direction="horizontal">
              <Button variant="primary">Login</Button>
              <Button variant="default">Sign up</Button>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Section>
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

function CheckboxComponent() {
  const [checked, setChecked] = React.useState(false);

  return (
    <Section>
      <Stack spacing="space-lg">
        <Header tag="h2">Checkbox</Header>
        <Text>
          Checkboxes are boolean inputs that a user can toggle between enabled and disabled states.
          The <code>Checkbox</code> component is a low-level primitive that represents just a
          checkbox and an optional label together.
        </Text>
        <Card>
          <Checkbox checked={checked} label="Remember Me" />
        </Card>
        <Text>
          While a <code>Checkbox</code> on it's own is perfectly functional, forms should generally
          prefer <code>FormSwitch</code> for longer lists of selectable items, as they flow more
          consistently with other form elements in a group. <code>Checkbox</code> is better suited
          for small spaces and other inputs where the user is accepting or acknowledging some
          content, while <code>FormSwitch</code> is more fit for toggling settings that likely have
          more descriptive context to go along with them.
        </Text>
      </Stack>
    </Section>
  );
}

function ButtonComponent() {
  return (
    <Section>
      <Stack spacing="space-lg">
        <Header tag="h2">Button</Header>
        <Text>Buttons are the main way that users perform an action on a page.</Text>
        <Card>
          <Stack spacing="space-md" direction="horizontal">
            <Button variant="primary">Primary</Button>
            <Button variant="default">Default</Button>
            <Button variant="success">Success</Button>
            <Button variant="info">Info</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="link">Link</Button>
          </Stack>
        </Card>
        <Text>
          When using multiple buttons on a page, consider how they draw attention and the hierarchy
          of actions that can be performed. In general, use a <code>primary</code> Button for the
          main action in a form, and have all other actions use either <code>default</code> or{" "}
          <code>link</code>. Depending on the context of the action, other variants may be more
          appropriate, like <code>danger</code> for destructive actions, or <code>success</code> for
          indicating agreement.
        </Text>
        <Text>
          The general hierarchy for Buttons in a form should be <code>primary</code> for a submit
          action, then <code>default</code> for auxiliary actions (like Learn More or View Item),
          then <code>link</code> for canceling actions.
        </Text>
        <Card>
          <Stack spacing="space-md" direction="horizontal">
            <Button variant="primary">Submit</Button>
            <Button variant="default">Learn More</Button>
            <Button variant="link">Cancel</Button>
          </Stack>
        </Card>
      </Stack>
    </Section>
  );
}

const RADIO_GROUP_OPTIONS = [
  { label: "Option One", value: "one" },
  { label: "Option Two", value: "two" },
  { label: "Option Three", value: "three" },
];

const RADIO_GROUP_THEME_OPTIONS = [
  { label: "Light Theme", value: Theme.LIGHT },
  { label: "Dark Theme", value: Theme.DARK },
];

function RadioGroupComponent() {
  const [selectedRadio, setSelectedRadio] = React.useState(RADIO_GROUP_OPTIONS[0].value);
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <Section>
      <Stack spacing="space-lg">
        <Header tag="h2">RadioGroup</Header>
        <Text>
          <code>RadioGroup</code> is similar to a <code>SelectInput</code>, but intended for showing
          a small number of equally-prominent options. Where a <code>SelectInput</code> requires the
          user to interact with the component to see all of the available options
        </Text>
        <Card>
          <RadioGroup
            options={RADIO_GROUP_OPTIONS}
            value={selectedRadio}
            onChange={(event) => setSelectedRadio(event.target.value)}
          />
        </Card>
        <Text>
          <code>RadioGroup</code> should generally be avoided when there are more than 4 or 5
          options to choose from. At that point, a <code>SelectInput</code> often becomes easier to
          comprehend and greatly reduces the footprint. Exceptions to this pattern could be where
          the only component on a page is the <code>RadioGroup</code> (for example, a language
          selector on it's own settings page, where each language is a radio item).
        </Text>
        <Text>
          Similarly, with only 2 options, <code>RadioGroup</code> can be a good alternative to a{" "}
          <code>Checkbox</code> or <code>FormSwitch</code> when the options aren't toggles like
          On/Off or Enabled/Disabled.
        </Text>
        <Card>
          <RadioGroup
            options={RADIO_GROUP_THEME_OPTIONS}
            value={theme}
            onChange={(event) => setTheme(event.target.value as Theme)}
          />
        </Card>
      </Stack>
    </Section>
  );
}

function FormControlComponent() {
  const [selectedRadio, setSelectedRadio] = React.useState(RADIO_GROUP_OPTIONS[0].value);

  return (
    <Section>
      <Stack spacing="space-lg">
        <Header tag="h2">FormControl</Header>
        <Text>
          <code>FormControl</code> is a wrapper for all kinds of standard input elements like{" "}
          <code>TextInput</code>, <code>SelectInput</code>, and others that provides presentational
          attributes like labels, notes, and exception states to wrap the inner input in a
          consistent fashion.
        </Text>
        <Card>
          <FormControl label="Username" note="Usernames may only contain letters and numbers.">
            <TextInput placeholder="gdqmonitor" />
          </FormControl>
        </Card>
        <Card>
          <FormControl
            label="Select an Option"
            note="Selecting an option won't do anything on this page"
          >
            <RadioGroup
              options={RADIO_GROUP_OPTIONS}
              value={selectedRadio}
              onChange={(event) => setSelectedRadio(event.target.value)}
            />
          </FormControl>
        </Card>
      </Stack>
    </Section>
  );
}

function FormSwitchComponent() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Section>
      <Stack spacing="space-lg">
        <Header tag="h2">FormSwitch</Header>
        <Text>
          <code>FormSwitch</code> is an "improved" checkbox variation that provides more room for
          label text and an additional note underneath, better matching the look of other{" "}
          <code>FormControl</code> elements and maintaining a more constant rhythm on the page.
        </Text>
        <Card>
          <FormSwitch
            label="Enable a super secret setting"
            checked={checked}
            onChange={(event) => setChecked(event.target.checked)}
            note="Do something super secret. Doesn't actually do anything, but you can pretend that it does."
          />
        </Card>
        <Text>
          When using multiple buttons on a page, consider how they draw attention and the hierarchy
          of actions that can be performed. In general, use a <code>primary</code> Button for the
          main action in a form, and have all other actions use either <code>default</code> or{" "}
          <code>link</code>. Depending on the context of the action, other variants may be more
          appropriate, like <code>danger</code> for destructive actions, or <code>success</code> for
          indicating agreement.
        </Text>
        <Text>
          The general hierarchy for Buttons in a form should be <code>primary</code> for a submit
          action, then <code>default</code> for auxiliary actions (like Learn More or View Item),
          then <code>link</code> for canceling actions.
        </Text>
        <Card>
          <Stack spacing="space-md" direction="horizontal">
            <Button variant="primary">Submit</Button>
            <Button variant="default">Learn More</Button>
            <Button variant="link">Cancel</Button>
          </Stack>
        </Card>
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
      <Example />
      <TextInputComponent />
      <CheckboxComponent />
      <ButtonComponent />
      <RadioGroupComponent />
      <FormControlComponent />
      <FormSwitchComponent />
    </Stack>
  );
}
