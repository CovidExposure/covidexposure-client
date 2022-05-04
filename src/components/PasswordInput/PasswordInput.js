import { PasswordInput as PwdInput } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { setPassword } from '../../features/userData/userDataSlice';

export default function PasswordInput() {
  let password = useSelector(state => state.userData.password);
  let dispatch = useDispatch();

  return (
    <PwdInput
      label="Password"
      onChange={event => dispatch(setPassword(event.currentTarget.value))}
      placeholder="Password"
      required
      value={password}
    />
  );
}
