import { Button, Checkbox, createStyles, Group, Modal } from '@mantine/core';
import { Check } from 'tabler-icons-react';
import { DatePicker, TimeInput } from '@mantine/dates';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';

const useStyles = createStyles(_ => ({
  controls: {
    marginTop: '5px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
}));

export default function ReportExposureModal({ openModal, setOpenModal }) {
  let [isPositive, setIsPositive] = useState(false);
  let [dateTested, setDateTested] = useState(new Date());
  let [timeTested, setTimeTested] = useState(new Date());
  let { classes } = useStyles();

  const reportTest = () => {
    let params = new URLSearchParams();
    params.append('isPositive', isPositive);

    let date = new Date();
    date.setDate(dateTested.getDate());
    date.setMonth(dateTested.getMonth());
    date.setFullYear(dateTested.getFullYear());
    date.setSeconds(timeTested.getSeconds());
    date.setMinutes(timeTested.getMinutes());
    date.setHours(timeTested.getHours());

    let isoString = date.toISOString();
    params.append('timeTested', isoString.substring(0, isoString.length - 5));

    fetch(`${window.COVID_EXPOSURE_SERVICE_ENDPOINT}/visitor/test_record`, {
      body: params,
      credentials: 'include',
      method: 'POST',
    })
      .then(response => {
        if (response.ok) {
          showNotification({
            autoClose: 3000,
            color: 'blue',
            icon: <Check />,
            message: 'Your Test Result is Submitted.',
            title: 'Success',
          });
          setOpenModal(false);
        } else {
          throw new Error();
        }
      })
      .catch(error => {
        console.error(error);
        showNotification({
          autoClose: 3000,
          color: 'red',
          message: 'Unexpected Error Encountered. Please Try Again.',
          title: 'Error',
        });
      });
  };

  return (
    <Modal
      opened={openModal}
      onClose={() => setOpenModal(false)}
      title="Report Test Result"
    >
      <form className={classes.form}>
        <Group className={classes.controls}>
          <DatePicker
            defaultValue={new Date()}
            label="Test date"
            placeholder="Date"
            onChange={setDateTested}
            required
            value={dateTested}
          />
          <TimeInput
            label="Time"
            onChange={setTimeTested}
            required
            value={timeTested}
          />
        </Group>
        <Checkbox
          checked={isPositive}
          label="Positive"
          onChange={event => setIsPositive(event.currentTarget.checked)}
        />
        <Group className={classes.controls} position="right">
          <Button onClick={reportTest} variant="light">Submit</Button>
        </Group>
      </form>
    </Modal>
  );
}
