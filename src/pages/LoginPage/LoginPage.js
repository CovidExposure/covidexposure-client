import { Button, Container, createStyles, Group } from '@mantine/core';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn } from '../../features/userData/userDataSlice';

import EmailInput from '../../components/EmailInput/EmailInput';
import logo from '../../assets/images/logo.png';
import PasswordInput from '../../components/PasswordInput/PasswordInput';

const useStyles = createStyles((theme, params, getRef) => ({
  container: {
    display: 'grid',
    height: '100vh',
    minWidth: '350px',
  },
  buttons: {
    marginTop: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '36px',
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
  let { loggedIn } = useSelector(state => state.userData);
  let dispatch = useDispatch();
  let { classes } = useStyles();

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
            <Button variant="filled">Login</Button>
            <Button color="gray" variant="outline">Register</Button>
          </Group>
        </form>
      </Container>
    );
  }
}
