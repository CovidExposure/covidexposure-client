import { Container, createStyles, Title, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';

const useStyles = createStyles(_ => ({
  emptyHistoryContainer: {
    textAlign: 'center',
  },
}));

export default function HistoryList() {
  let [history, setHistory] = useState([]);
  let { classes } = useStyles();

  useEffect(() => {
    fetch(`${window.COVID_EXPOSURE_SERVICE_ENDPOINT}/visitor/test_record`, { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setHistory(data.content);
        } else {
          showNotification({
            autoClose: 3000,
            color: 'red',
            message: data.failure,
            title: 'Error',
          });
        }
      })
      .catch(err => {
        console.log(err);
        setHistory([]);
        showNotification({
          autoClose: 3000,
          color: 'red',
          message: 'Unexpected error encountered - please refresh',
          title: 'Error',
        });
      });
  }, []);

  if (history.length <= 0) {
    return (
      <Container>
        <Text align="center" color="#606060" size="xs">Empty history</Text>
      </Container>
    );
  }

  return (
    <main>

    </main>
  );
}