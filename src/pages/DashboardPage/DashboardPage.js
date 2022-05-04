import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setEmail, setPassword, setLoggedIn } from '../../features/userData/userDataSlice';

export default function DashboardPage() {
  let { loggedIn } = useSelector(state => state.userData);

  if (loggedIn === false) {
    return <Navigate to="/login" />;
  } else {
    return <h1>Dashboard</h1>;
  }
}
