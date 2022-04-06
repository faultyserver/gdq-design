import * as React from "react";
import { Callout, Card, Header, Stack, Text } from "gdq-design";

import PageHeader from "./PageHeader";

export default function Home() {
  return (
    <Stack spacing="space-lg" align="stretch">
      <PageHeader
        name="GDQ Design System"
        tagline="GDQ's Design System for React-based web applications."
      />
      <Text>
        Welcome to the GDQ Design System documentation. The design system is currently defined as a
        React-based JavaScript package, built to provide a sharp, clear, and consistent look and
        feel across all of the applications that GDQ operates.
      </Text>
      <Callout type="warning">
        <Header tag="h3" variant="header-sm/normal" withMargin>
          This system is still in development!
        </Header>
        <Text>
          Not all of the planned components for the design system have been implemented yet. As
          progress is made, interfaces may change
        </Text>
      </Callout>
      <Header tag="h2">Installation</Header>
      <Text>To get started, install the design system using your package manager of choice.</Text>
      <Card>
        <Text>
          <code>npm install @gamesdonequick/gdq-design</code>
        </Text>
        <Text>
          <code>yarn add @gamesdonequick/gdq-design</code>
        </Text>
      </Card>
    </Stack>
  );
}
