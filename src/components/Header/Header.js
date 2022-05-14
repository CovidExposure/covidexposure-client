import { ActionIcon, Burger, createStyles, Container, Header as MantineHeader, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Logout, Qrcode } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';
import { useBooleanToggle } from '@mantine/hooks';
import { useDispatch } from 'react-redux'

import logo from '../../assets/images/logo.png';
import { setEmail, setPassword, setLoggedIn } from '../../features/userData/userDataSlice';

const useStyles = createStyles(theme => ({
  header: {
    backgroundColor: theme.colors[theme.primaryColor][6],
    borderBottom: 0,
  },
  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  burger: {
    display: 'none',
  },
  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.white,
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    '&:hover': {
      backgroundColor: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 7 : 5],
    },
  },
  linkLabel: {
    marginRight: 5,
  },
  social: {
    width: 260,
    [theme.fn.smallerThan('sm')]: {
      width: 'auto',
      marginLeft: 'auto',
    },
  },
  logo: {
    height: '36px',
  },
}));

export default function Header() {
  let [opened, toggleOpened] = useBooleanToggle(false);
  let { classes } = useStyles();
  let dispatch = useDispatch();

  const logOutUser = () => {
    fetch(`${window.COVID_EXPOSURE_SERVICE_ENDPOINT}/logout`, {
      credentials: 'include',
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          dispatch(setEmail(''));
          dispatch(setLoggedIn(false));
          dispatch(setPassword(''));
          localStorage.removeItem('userInfo');
        } else {
          showNotification({
            autoClose: 3000,
            color: 'red',
            message: 'Logout Unsuccessful. Please Try Again.',
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

  return (
    <MantineHeader height={56} mb={120}>
      <Container className={classes.inner}>
        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          size="sm"
          className={classes.burger}
        />
        
        <Link to="/">
          <img src={logo} alt="" className={classes.logo} />
        </Link>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <ActionIcon size="lg">
            <Qrcode size={18} />
          </ActionIcon>
          <ActionIcon size="lg" onClick={logOutUser}>
            <Logout size={18} />
          </ActionIcon>
        </Group>
      </Container>
    </MantineHeader>
  );
}
