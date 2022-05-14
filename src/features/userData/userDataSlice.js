import { createSlice } from '@reduxjs/toolkit';

const userInfo = localStorage.getItem('userInfo');

const initialState = {
  loggedIn: userInfo !== null,
  email: (userInfo === null) ? '' : JSON.parse(userInfo).email,
  password: (userInfo === null) ? '' : JSON.parse(userInfo).password,
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
});

export const { setEmail, setLoggedIn, setPassword } = userDataSlice.actions;

export default userDataSlice.reducer;
