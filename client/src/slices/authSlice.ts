import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from "jwt-decode";

interface User {
  id: string | null;
  role: string | null;
  token: string | null;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: {
    id: null,
    role: null,
    token: null,
  },
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      state.isLoading = true;
    },
    loginSuccess(state, action: PayloadAction<{ token: string }>) {
      state.isLoggedIn = true;
      state.user.token = action.payload.token;
      state.isLoading = false;
      state.error = null;

      // Decode the token to get user details
      const decodedToken: any = jwtDecode(action.payload.token);

    //   Ensure you match the structure of your token payload
      state.user.id = decodedToken.user.id;
      state.user.role = decodedToken.user.role;

      console.log('User ID in token:', decodedToken.user.id); // Log for debugging
    //   console.log('User Role in token:', decodedToken.user.role); // Log for debugging
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = {
        id: null,
        role: null,
        token: null,
      };
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
