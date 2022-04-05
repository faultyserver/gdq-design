import * as React from "react";

import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormSwitch,
  Header,
  Spacer,
  Stack,
  Text,
  TextInput,
} from "gdq-design";

const POSITIONS = [
  "Donation Station",
  "Tech",
  "Audio",
  "Check-In",
  "Teardown",
  "Hosting*",
  "Photo/Video",
  "Setup",
  "Stylist",
  "Enforcement*",
];

export default function Volunteer() {
  const [graveyard, setGraveyard] = React.useState(false);
  const [onSite, setOnSite] = React.useState(false);
  const [experience, setExperience] = React.useState(false);

  const [modTwitch, setModTwitch] = React.useState(false);
  const [modDiscord, setModDiscord] = React.useState(false);
  const [social, setSocial] = React.useState(false);

  return (
    <form>
      <Stack spacing="space-lg">
        <Header tag="h1" variant="header-xl/normal">
          SGDQ2022 Volunteer Application
        </Header>
        <Text>
          Ensure that your display name for your GDQ account is what you want to be publicly known
          and credited as. You can change your display name before the registration deadline by
          going to your profile.
        </Text>
        <Card>
          <Stack spacing="space-lg">
            <FormSwitch
              label="Are you willing to work graveyard shifts?"
              note="Graveyard is between 12AM and 8AM event local time. (CDT/UTC-5)"
              checked={graveyard}
              onChange={(event) => setGraveyard(event.target.checked)}
            />
            <div>
              <FormControl
                label="When will you be available for volunteer shifts?"
                note="Please factor in things like hotel check-in, flight times, and shuttle requirements."
              >
                <TextInput />
              </FormControl>
            </div>
          </Stack>
        </Card>
        <Card>
          <Stack spacing="space-lg">
            <Header tag="h2">On-Site Volunteer</Header>
            <FormSwitch
              label="I'm interested in On-Site Opportunities"
              checked={onSite}
              onChange={(event) => setOnSite(event.target.checked)}
            />
            <div>
              <FormSwitch
                label="Do you have previous experience volunteering at GDQ?"
                checked={experience}
                onChange={(event) => setExperience(event.target.checked)}
              />
              <Spacer size="space-md" />
              <FormControl note="If so, please specify">
                <TextInput />
              </FormControl>
            </div>
            <Stack spacing="space-sm">
              <Text variant="header-sm/normal">
                Which roles are you interested in volunteering for?
              </Text>
              {POSITIONS.map((position) => (
                <Checkbox label={position} checked={false} />
              ))}
              <Text variant="text-md/secondary">*More info required below</Text>
            </Stack>
            <FormControl label="Any other information in regards to qualifications?">
              <TextInput />
            </FormControl>
          </Stack>
        </Card>
        <Card>
          <Stack spacing="space-lg">
            <Header tag="h2">Off-Site Volunteer</Header>
            <div>
              <FormSwitch
                label="Are you interested in moderating Twitch chat?"
                note="Moderation involves watching Twitch chat, banning offensive messages, and answering questions from chat."
                checked={modTwitch}
                onChange={(event) => setModTwitch(event.target.checked)}
              />
              {modTwitch ? (
                <FormControl note="Please provide your Twitch username">
                  <TextInput />
                </FormControl>
              ) : null}
            </div>
            <div>
              <FormSwitch
                label="Are you interested in moderating Discord chat?"
                note="Moderation involves asynchronously keeping up with Discord, answering questions, and keeping the peace between users in the server."
                checked={modDiscord}
                onChange={(event) => setModDiscord(event.target.checked)}
              />
              {modDiscord ? (
                <FormControl note="Please provide your Discord username">
                  <TextInput />
                </FormControl>
              ) : null}
            </div>
            <div>
              <FormSwitch
                label="Are you interested in livetweeting our event?"
                note="You'll be responsible for tweeting out run announcements, sponsors, and special moments from our Twitter account."
                checked={social}
                onChange={(event) => setSocial(event.target.checked)}
              />
              {social ? (
                <FormControl note="Please provide your Twitter handle">
                  <TextInput />
                </FormControl>
              ) : null}
            </div>
            <FormControl
              label="Do you have experience with chat moderation or community management?"
              note="Feel free to include experience outside of GDQ events."
            >
              <TextInput />
            </FormControl>
          </Stack>
        </Card>
        <Button variant="primary">Submit Application</Button>
      </Stack>
    </form>
  );
}
