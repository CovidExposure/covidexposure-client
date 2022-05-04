import { TextInput } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail } from '../../features/userData/userDataSlice';

export default function EmailInput() {
  let email = useSelector(state => state.userData.email);
  let dispatch = useDispatch();

  return (
    <TextInput
      label="Email"
      onChange={event => dispatch(setEmail(event.currentTarget.value))}
      placeholder="Email"
      required
      value={email}
    />
  );
}
