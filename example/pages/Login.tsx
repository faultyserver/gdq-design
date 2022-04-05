import * as React from "react";

import {
  Button,
  Card,
  Checkbox,
  FormControl,
  Header,
  Spacer,
  Stack,
  Text,
  TextInput,
} from "gdq-design";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(false);

  return (
    <Stack direction="horizontal" spacing="space-lg" justify="stretch">
      <Card>
        <form>
          <Stack spacing="space-md">
            <Header tag="h2">Login to Games Done Quick</Header>
            <FormControl label="Username" note="NOTE: Email addresses are CASE sensitive">
              <TextInput value={username} onChange={(event) => setUsername(event.target.value)} />
            </FormControl>
            <FormControl label="Password">
              <TextInput
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormControl>
            <Spacer />
            <Stack direction="horizontal" spacing="space-lg" align="center">
              <Button variant="primary" type="submit">
                Login
              </Button>
              <Checkbox
                label="Remember Me"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
              />
            </Stack>
          </Stack>
        </form>
      </Card>
      <Stack spacing="space-lg">
        <Text>
          Your GDQ account allows you to register for attending events, submit runs to marathons,
          and more.
        </Text>
        <Button variant="default">Create an Account</Button>
        <Text>If you forgot your password, you can request a reset</Text>
        <Button variant="warning">Request a Password Reset</Button>
      </Stack>
    </Stack>
  );
}
