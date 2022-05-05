import { Button, Container, createStyles, Group, Modal, NativeSelect, TextInput } from '@mantine/core';
import { useState } from 'react';

const STATES = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
];

const useStyles = createStyles(theme => ({
  controls: {
    marginTop: '5px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
}));

export default function ReportExposureModal({ openModal, setOpenModal }) {
  let [addressLine1, setAddressLine1] = useState('');
  let [addressLine2, setAddressLine2] = useState('');
  let [city, setCity] = useState('');
  let [state, setState] = useState('');
  let [zipCode, setZipCode] = useState('');

  let { classes } = useStyles();

  return (
    <Modal
      opened={openModal}
      onClose={() => setOpenModal(false)}
      title="Report Exposure"
    >
      <form className={classes.form}>
        <TextInput
          label="Address Line 1"
          onChange={event => setAddressLine1(event.currentTarget.value)}
          placeholder="Address Line 1"
          required
          value={addressLine1}
        />
        <TextInput
          label="Address Line 2"
          onChange={event => setAddressLine2(event.currentTarget.value)}
          placeholder="Address Line 2"
          value={addressLine2}
        />
        <TextInput
          label="City"
          onChange={event => setCity(event.currentTarget.value)}
          placeholder="City"
          required
          value={city}
        />
        <NativeSelect
          data={STATES}
          label="State"
          onChange={(event) => setState(event.currentTarget.value)}
          required
          value={state}
        />
        <TextInput
          label="Zip Code"
          onChange={event => setZipCode(event.currentTarget.value)}
          placeholder="Zip Code"
          required
          value={zipCode}
        />

        <Group className={classes.controls} position="right">
          <Button variant="light">Submit</Button>
        </Group>
      </form>
    </Modal>
  );
}
