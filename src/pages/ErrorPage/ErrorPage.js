import { Button, Container, createStyles, Text, Title } from '@mantine/core';
import { Home } from 'tabler-icons-react';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme, params, getRef) => ({
  container: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    gap: '4rem',
    height: '100vh',
    justifyContent: 'center',
    padding: '0 36px',
  },
  message: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
}));

export default function ErrorPage() {
  let { classes } = useStyles();
  return (
    <Container className={classes.container}>
      <div className={classes.message}>
        <Title order={1}>Error</Title>
        <Text size="md">Apologies, the page you're looking for cannot be found.</Text>
      </div>
      <Button leftIcon={<Home size={18} />} component={Link} to="/">Home</Button>
    </Container>
  );
}
