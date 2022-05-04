import { Container, Text, Title } from '@mantine/core';

export default function ErrorPage() {
  return (
    <Container
      sx={(_) => ({
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        height: '100vh',
        justifyContent: 'center',
    })}>
      <Title order={1}>Error</Title>
      <Text size="md">Apologies, the page you're looking for cannot be found.</Text>
    </Container>
  );
}
