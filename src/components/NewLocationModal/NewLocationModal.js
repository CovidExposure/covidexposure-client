import { Button, createStyles, Group, Modal, NativeSelect, TextInput } from '@mantine/core';
import { Check } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';
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

export default function NewLocationModal({ openModal, setOpenModal }) {
  let [addressLine1, setAddressLine1] = useState('');
  let [addressLine2, setAddressLine2] = useState('');
  let [city, setCity] = useState('');
  let [state, setState] = useState('');
  let [zipCode, setZipCode] = useState('');
  let [name, setName] = useState('');
  let [category, setCategory] = useState('');

  let { classes } = useStyles();

  const submitNewLocation = () => {
    let params = new URLSearchParams();

    fetch(`${window.COVID_EXPOSURE_SERVICE_ENDPOINT}/business`, {
      body: params,
      credentials: 'include',
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          showNotification({
            autoClose: 3000,
            color: 'blue',
            icon: <Check />,
            message: 'Please Save the QR Code in the New Tab.',
            title: 'Success',
          });
          window.open(`http://api.qrserver.com/v1/create-qr-code/?data=${window.COVID_EXPOSURE_SERVICE_ENDPOINT}${data.content}&size=800x800`, "_blank");
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
      title="Generate QR Code"
    >
      <form className={classes.form}>
        <TextInput
          label="Name"
          onChange={event => setName(event.currentTarget.value)}
          placeholder="Name"
          required
          value={name}
        />
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
        <TextInput
          label="Category"
          onChange={event => setCategory(event.currentTarget.value)}
          placeholder="Category"
          required
          value={category}
        />

        <Group className={classes.controls} position="right">
          <Button onClick={submitNewLocation} variant="light">Submit</Button>
        </Group>
      </form>
    </Modal>
  );
}
