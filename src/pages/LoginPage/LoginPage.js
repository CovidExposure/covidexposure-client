import { Button, Container, createStyles, Group } from '@mantine/core';
import { Link } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '@mantine/notifications';

import EmailInput from '../../components/EmailInput/EmailInput';
import logo from '../../assets/images/logo.png';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { setLoggedIn } from '../../features/userData/userDataSlice';

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

export default function LoginPage() {
  let { email, loggedIn, password } = useSelector(state => state.userData);
  let dispatch = useDispatch();
  let { classes } = useStyles();

  const logInUser = () => {
    let params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);

    fetch(`${window.COVID_EXPOSURE_SERVICE_ENDPOINT}/login`, {
      body: params,
      credentials: 'include',
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          dispatch(setLoggedIn(true));
          localStorage.setItem('userInfo', JSON.stringify({ email, password }));
        } else {
          showNotification({
            autoClose: 3000,
            color: 'red',
            message: 'Invalid Email or Password.',
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
            <EmailInput />
            <PasswordInput />
          </div>

          <Group className={classes.buttons} position='center'>
            <Button variant="filled" onClick={logInUser}>Login</Button>
            <Button color="gray" variant="outline" component={Link} to="/signup">Sign Up</Button>
          </Group>
        </form>
      </Container>
    );
  }
}
