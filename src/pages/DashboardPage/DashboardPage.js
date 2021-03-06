import { Button, Container, createStyles, Title, Text } from '@mantine/core';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Plus } from 'tabler-icons-react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import Header from '../../components/Header/Header';
import NewLocationModal from '../../components/NewLocationModal/NewLocationModal';
import ReportExposureModal from '../../components/ReportExposureModal/ReportExposureModal';
import TestHistoryList from '../../components/TestHistoryList/TestHistoryList';
import VisitHistoryList from '../../components/VisitHistoryList/VisitHistoryList';

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
  historyContainer: {
    alignItems: 'flex-start',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '36px',
    justifyContent: 'space-between',
    marginTop: '96px',
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
  let [requestParams, setRequestParams] = useSearchParams();
  
  if (requestParams.get("checkin_endpoint")) {
    localStorage.setItem("checkin_endpoint", requestParams.get("checkin_endpoint"));
    requestParams.delete("checkin_endpoint");
    setRequestParams(requestParams);
  } 

  if (loggedIn === false) {
    return <Navigate to="/login" />;
  } else {
    return (
      <>
        <Header />

        <Container className={classes.headerContainer}>
          <div className={classes.description}>
            <Title order={1}>Dashboard</Title>
            <Text size="md">If there is no QR code to scan, please <span className={classes.locationModalLink} onClick={() => setOpenLocationModal(true)}>generate</span> one and print it.</Text>
          </div>
          <Button leftIcon={<Plus size={18} />} onClick={() => setOpenExposureModal(true)}>Test Result</Button>
        </Container>

        <Container className={classes.historyContainer}>
          <TestHistoryList />
        </Container>

        <Container className={classes.historyContainer}>
          <VisitHistoryList />
        </Container>

        <NewLocationModal openModal={openLocationModal} setOpenModal={setOpenLocationModal} />
        <ReportExposureModal openModal={openExposureModal} setOpenModal={setOpenExposureModal} />
      </>
    );
  }
}
