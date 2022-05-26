import { createStyles, Table, Title, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';

const useStyles = createStyles(_ => ({
  title: {
    marginBottom: '12px'
  },
}));

export default function VisitHistoryList() {
  let [history, setHistory] = useState([]);
  let { classes } = useStyles();

  useEffect(() => {
    fetch(`${window.COVID_EXPOSURE_SERVICE_ENDPOINT}/visitor/visit_record`, { credentials: 'include' })
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
      <>
        <Title order={2}>Visit History</Title>
        <Text color="#606060" size="xs">Empty history</Text>
      </>
    );
  }

  return (
    <main>
      <Title className={classes.title} order={2}>Visit History</Title>
      <Table>
        <thead>
          <tr>
            <th>Where</th>
            <th>Address</th>
            <th>Status</th>
            <th>Time Visited</th>
          </tr>
        </thead>
        <tbody>
          {history.map(({ business, status, timestamp }) => {
            return (
              <tr key={crypto.randomUUID()}>
                <td>{business.name}</td>
                <td>{business.location.address1}, {business.location.city}, {business.location.state}</td>
                <td>{status}</td>
                <td>{timestamp}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </main>
  );
}