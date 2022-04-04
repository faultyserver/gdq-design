import * as React from "react";

import {
  Anchor,
  BrandLogo,
  Button,
  Callout,
  Card,
  Checkbox,
  Divider,
  FormControl,
  FormSwitch,
  Header,
  Hero,
  RadioGroup,
  SelectInput,
  Stack,
  Text,
  TextInput,
} from "gdq-design";

const selectItems = [
  {
    name: "Option One",
    value: "one",
  },
  {
    name: "Option Two",
    value: "two",
  },
  {
    name: "Option Three",
    value: "three",
  },
  {
    name: "Option Four",
    value: "four",
  },
  {
    name: "Option Five",
    value: "five",
  },
];

export default function Demo() {
  const [textValue, setTextValue] = React.useState("");
  const [selectedItem, setSelectedItem] = React.useState<{ name: string; value: string }>();
  const [checked, setChecked] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState<string | undefined>();
  const [switchChecked, setSwitchChecked] = React.useState(false);

  return (
    <>
      <Stack spacing="space-lg">
        <Hero type="primary">
          <Stack direction="horizontal" spacing="space-lg">
            <BrandLogo color="white" />
            <div>
              <Header tag="h1" variant="header-xl" uppercase>
                GDQ Design System
              </Header>
              <Text variant="text-lg">This is a demo of the GDQ Design System components.</Text>
            </div>
          </Stack>
        </Hero>
        <FormControl label="A text input" note="Some hint text to nudge the user">
          <TextInput
            value={textValue}
            onChange={(event) => setTextValue(event.target.value)}
            placeholder="Placeholder text..."
          />
        </FormControl>
        <FormControl label="Another text input">
          <TextInput
            value={textValue}
            type="password"
            onChange={(event) => setTextValue(event.target.value)}
            placeholder="Different placeholder"
          />
        </FormControl>
        <FormControl label="A select input">
          <SelectInput items={selectItems} selectedItem={selectedItem} onSelect={setSelectedItem} />
        </FormControl>
        <Checkbox
          checked={checked}
          label="An unchecked checkbox"
          onChange={() => setChecked(!checked)}
        />
        <RadioGroup
          value={radioValue}
          onChange={(event) => setRadioValue(event.target.value)}
          options={[
            { value: "one", label: "First Option" },
            { value: "two", label: "Second Option" },
            { value: "three", label: "Third Option" },
          ]}
        />
        <Stack direction="horizontal" spacing="space-md">
          <Button variant="primary">Primary</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="info">Info</Button>
          <Button variant="default">Default</Button>
          <Button variant="link">Link</Button>
        </Stack>
        <Divider />
        <Callout type="info">
          <Header tag="h3" variant="header-sm" withMargin>
            This is a Callout
          </Header>
          <Text>
            A callout indicates something has happened. It could be something good, bad, or just
            informational, but it's meant to bring attention to a notification.
          </Text>
        </Callout>
        <FormSwitch
          checked={switchChecked}
          onChange={(event) => setSwitchChecked(event.target.checked)}
          label="A FormSwitch is a better checkbox for settings"
          note="They take up the full width of the container and have a more prominent label and spacing, making them flow better with the rest of the page."
        />
        <Card>
          <Stack spacing="space-lg">
            <Header tag="h2" variant="header-md">
              This is a card
            </Header>
            <Text>
              Cards are nestable structures that differentiate sections of content on a single page.
              Cards should generally be used to draw attention to important content, or clearly
              indicate a single group among many ungrouped components.
            </Text>
            <FormControl label="A text input" note="Some hint text to nudge the user">
              <TextInput
                value={textValue}
                onChange={(event) => setTextValue(event.target.value)}
                placeholder="Placeholder text..."
              />
            </FormControl>
            <Card>
              <Text>
                Cards automatically take care of nesting to ensure color boundaries are visible.
                This one also has a <Anchor href="/login">link inside of it</Anchor>.
              </Text>
            </Card>
            <Stack direction="reverse-horizontal" spacing="space-md">
              <Button variant="primary">Submit</Button>
              <Button variant="default">Learn More</Button>
              <Button variant="link">Cancel</Button>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </>
  );
}
