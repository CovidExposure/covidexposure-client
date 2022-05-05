import { Button, Container, createStyles, Title, Text } from '@mantine/core';
import { Navigate } from 'react-router-dom';
import { Plus } from 'tabler-icons-react';
import { useSelector } from 'react-redux';

import Header from '../../components/Header/Header';

const useStyles = createStyles(theme => ({
  addButton: {
    root: {
      backgroundColor: '#00acee',
      border: 0,
      '&:hover': {
        backgroundColor: theme.fn.darken('#00acee', 0.05),
      },
    },
    leftIcon: {
      marginRight: 15,
    },
  },
  headerContainer: {
    alignItems: 'flex-start',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '36px',
    justifyContent: 'space-between',
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
}));

export default function DashboardPage() {
  let { loggedIn } = useSelector(state => state.userData);
  let { classes } = useStyles();

  if (loggedIn === false) {
    return <Navigate to="/login" />;
  } else {
    return (
      <>
        <Header />
        <Container className={classes.headerContainer}>
          <div className={classes.description}>
            <Title order={1}>Exposure History</Title>
            <Text size="md">If there is no QR code to scan, please generate one and print it.</Text>
          </div>
          <Button leftIcon={<Plus size={18} />}>Report Exposure</Button>
        </Container>
        <main>
          
        </main>
      </>
    );
  }
}
