import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from "jwt-decode";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null, // This should include role
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      const decodedToken = jwtDecode(action.payload.token);
      state.user = { role: decodedToken.role, ...decodedToken };
    },
    logout(state) {
      state.token = null;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
