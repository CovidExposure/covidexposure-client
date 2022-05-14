import { Button, Container, createStyles, Group, PasswordInput, TextInput } from '@mantine/core';
import { Check } from 'tabler-icons-react';
import { Link, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { showNotification } from '@mantine/notifications';
import logo from '../../assets/images/logo.png';

const useStyles = createStyles((theme, params, getRef) => ({
  container: {
    display: 'grid',
    height: '100vh',
    padding: '18px auto',
    minWidth: '350px',
  },
  buttons: {
    marginTop: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    justifyContent: 'center',
  },
  inputFields: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  logo: {
    margin: '0 auto 30px',
    width: '50%',
  },
}));

export default function SignUpPage() {
  let [email, setEmail] = useState('');
  let [name, setName] = useState('');
  let [password, setPassword] = useState('');

  let loggedIn = useSelector(state => state.userData.loggedIn);
  let { classes } = useStyles();

  const signUpUser = () => {
    let params = new URLSearchParams();
    params.append('email', email);
    params.append('name', name);
    params.append('password', password);

    fetch(`${window.COVID_EXPOSURE_SERVICE_ENDPOINT}/signup`, {
      body: params,
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setEmail('');
          setName('');
          setPassword('');
          showNotification({
            autoClose: 3000,
            color: 'blue',
            icon: <Check />,
            message: 'Your Account is Created.',
            title: 'Success',
          });
        } else {
          showNotification({
            autoClose: 3000,
            color: 'red',
            message: 'User Exists.',
            title: 'Error',
          });
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

  if (loggedIn) {
    return <Navigate to="/" />;
  } else {
    return (
      <Container className={classes.container} size="xs">
        <form className={classes.form}>
          <img src={logo} alt="" className={classes.logo} />
          <div className={classes.inputFields}>
            <TextInput
              label="Name"
              onChange={event => setName(event.currentTarget.value)}
              placeholder="Name"
              required
              value={name}
            />
            <TextInput
              label="Email"
              onChange={event => setEmail(event.currentTarget.value)}
              placeholder="Email"
              required
              value={email}
            />
            <PasswordInput
              label="Password"
              onChange={event => setPassword(event.currentTarget.value)}
              placeholder="Password"
              required
              value={password}
            />
          </div>

          <Group className={classes.buttons} position='center'>
            <Button variant="filled" onClick={signUpUser}>Sign Up</Button>
            <Button color="gray" variant="outline" component={Link} to="/login">Login</Button>
          </Group>
        </form>
      </Container>
    );
  }
}
