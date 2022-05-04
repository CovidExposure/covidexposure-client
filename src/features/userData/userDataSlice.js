import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  email: '',
  password: ''
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

export const { setEmail, setPassword, setLoggedIn } = userDataSlice.actions;

export default userDataSlice.reducer;
