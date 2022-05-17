import { ActionIcon, Burger, createStyles, Container, Header as MantineHeader, Group } from '@mantine/core';
import { Check } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { Logout, Qrcode } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';
import { useBooleanToggle } from '@mantine/hooks';
import { useDispatch } from 'react-redux'
import { useRef, useEffect } from 'react';
import * as qs from 'query-string';

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
  hidden: {
    display: 'none'
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
  let fileInputRef = useRef(null);
  let submitButtonRef = useRef(null);

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
            message: data.failure,
            title: 'Error',
          });
        }
      })
      .catch(error => {
        console.error(error);
        showNotification({
          autoClose: 3000,
          color: 'red',
          message: 'Unexpected error encountered - please try again',
          title: 'Error',
        });
      });
  };

  const getCheckInEndpoint = async () => {
    let formData = new FormData();
    formData.append('file', fileInputRef.files[0]);

    let qrCodeResponse = await fetch(`${window.COVID_EXPOSURE_SERVICE_ENDPOINT}/business/qr-code`, {
      body: formData,
      credentials: 'include',
      method: 'POST'
    });
    let qrCodeData = await qrCodeResponse.json();
    return qs.parse(qrCodeData.content.split("?")[1]).checkin_endpoint;
  };

  const checkIn = async (event,checkInEndpoint) => {
    try {
      if (event) {
        event.preventDefault();
      }
      if (!checkInEndpoint) {
        checkInEndpoint = await getCheckInEndpoint();
      }
      let checkInResponse = await fetch(`${window.COVID_EXPOSURE_SERVICE_ENDPOINT}${checkInEndpoint}`, {
        credentials: 'include',
        method: 'POST'
      });
      let checkInData = await checkInResponse.json();

      if (checkInData.success) {
        showNotification({
          autoClose: 3000,
          color: 'blue',
          icon: <Check />,
          message: 'Your data is recorded',
          title: 'Success',
        });
      } else {
        showNotification({
          autoClose: 3000,
          color: 'red',
          message: checkInData.failure,
          title: 'Error',
        });
      }
    } catch (err) {
      showNotification({
        autoClose: 3000,
        color: 'red',
        message: 'Unexpected error encountered - please try again',
        title: 'Error',
      });
      console.error(err);
    } finally {
      localStorage.removeItem("checkin_endpoint");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("checkin_endpoint")) {
      checkIn(null,localStorage.getItem("checkin_endpoint"));
      localStorage.removeItem("checkin_endpoint");
    }
  }, [checkIn]);

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
          <ActionIcon
            size="lg"
            onClick={() => fileInputRef.click()}
          >
            <Qrcode size={18} />
          </ActionIcon>
          <ActionIcon size="lg" onClick={logOutUser}>
            <Logout size={18} />
          </ActionIcon>
        </Group>

        <form
          className={classes.hidden}
          onSubmit={async (event) => await checkIn(event)}
        >
          <input type="hidden" name="MAX_FILE_SIZE" value="1048576" />
          <input
            name="file"
            onChange={() => submitButtonRef.click()}
            ref={fileInput => fileInputRef = fileInput}
            type="file"
          />
          <input ref={submitInput => submitButtonRef = submitInput} type="submit" value="Submit" />
        </form>
      </Container>
    </MantineHeader>
  );
}
