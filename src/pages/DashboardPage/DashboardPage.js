import { Button, Container, createStyles, Modal, Title, Text } from '@mantine/core';
import { Navigate } from 'react-router-dom';
import { Plus } from 'tabler-icons-react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import Header from '../../components/Header/Header';
import NewLocationModal from '../../components/NewLocationModal/NewLocationModal';
import ReportExposureModal from '../../components/ReportExposureModal/ReportExposureModal';

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
  description: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  headerContainer: {
    alignItems: 'flex-start',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '36px',
    justifyContent: 'space-between',
  },
  locationModalLink: {
    color: 'orange',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
}));

export default function DashboardPage() {
  let { loggedIn } = useSelector(state => state.userData);
  let { classes } = useStyles();
  let [openExposureModal, setOpenExposureModal] = useState(false);
  let [openLocationModal, setOpenLocationModal] = useState(false);

  if (loggedIn === false) {
    return <Navigate to="/login" />;
  } else {
    return (
      <>
        <Header />

        <Container className={classes.headerContainer}>
          <div className={classes.description}>
            <Title order={1}>History</Title>
            <Text size="md">If there is no QR code to scan, please <span className={classes.locationModalLink} onClick={() => setOpenLocationModal(true)}>generate</span> one and print it.</Text>
          </div>
          <Button leftIcon={<Plus size={18} />} onClick={() => setOpenExposureModal(true)}>Test Result</Button>
        </Container>

        <main>
        </main>

        <NewLocationModal openModal={openLocationModal} setOpenModal={setOpenLocationModal} />
        <ReportExposureModal openModal={openExposureModal} setOpenModal={setOpenExposureModal} />
      </>
    );
  }
}
